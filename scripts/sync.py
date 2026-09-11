#!/usr/bin/env python3
"""Recompute every player's touchdown total from nflverse play-by-play and
write the results into data.js.

Pool rules, as implemented here:
  * A player is charged for every play on which he is credited as the scorer
    (td_player_id). That covers rushing, receiving, kick/punt return, fumble
    recovery in the end zone -- everything.
  * A player is also charged for every passing touchdown he THROWS
    (passer_player_id on a pass_touchdown play). Only pool players are ever
    tallied, and every pool player is RB/WR/TE, so QBs never enter the count.

Totals are recomputed from zero on every run, so upstream stat corrections
flow through automatically. Nothing is written unless every check passes.

Exit codes: 0 ok, 1 hard failure (nothing written), 2 a total went down and
--allow-decrease was not given (nothing written).
"""
import argparse
import csv
import datetime as dt
import gzip
import io
import json
import re
import subprocess
import sys
import urllib.request
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data.js"
RELEASE = "https://github.com/nflverse/nflverse-data/releases/download"

PLAYER_RE = re.compile(
    r'^(?P<pre>\s*\{ slot: "(?P<slot>\w+)",\s*name: "(?P<name>[^"]+)",\s*id: "(?P<id>[^"]+)",\s*)'
    r'td: (?P<td>\d+)(?P<adj>,\s*adjust: (?P<adjust>-?\d+))?(?P<post> \}.*)$'
)
SYNC_BEGIN = "// --- BEGIN SYNC (rewritten by scripts/sync.py; do not hand-edit) ---"
SYNC_END = "// --- END SYNC ---"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "notd-sync"})
    with urllib.request.urlopen(req, timeout=120) as r:
        raw = r.read()
    if not raw:
        die(f"empty response from {url}")
    return gzip.decompress(raw) if url.endswith(".gz") else raw


def die(msg, code=1):
    print(f"sync: FAIL: {msg}", file=sys.stderr)
    sys.exit(code)


def load_players(lines):
    players = []
    for i, line in enumerate(lines):
        m = PLAYER_RE.match(line)
        if m:
            players.append({
                "line": i, "slot": m["slot"], "name": m["name"], "id": m["id"],
                "td": int(m["td"]), "adjust": int(m["adjust"] or 0),
            })
    return players


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--season", type=int, default=2026)
    ap.add_argument("--allow-decrease", action="store_true",
                    help="accept a total going down (upstream stat correction)")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    lines = DATA.read_text().splitlines()
    players = load_players(lines)
    if len(players) != 72:
        die(f"expected 72 player lines in data.js, parsed {len(players)}")
    ids = {p["id"] for p in players}
    if len(ids) != 72:
        die("duplicate player ids in data.js")

    # --- roster sanity: every pool id must still be a known player ------------
    roster = fetch(f"{RELEASE}/rosters/roster_{args.season}.csv")
    known = {r["gsis_id"] for r in csv.DictReader(io.StringIO(roster.decode()))}
    missing = ids - known
    if missing:
        die(f"{len(missing)} pool ids not found in roster_{args.season}: {sorted(missing)}")

    # --- play-by-play ---------------------------------------------------------
    pbp = fetch(f"{RELEASE}/pbp/play_by_play_{args.season}.csv.gz")
    rows = list(csv.DictReader(io.StringIO(pbp.decode())))
    if not rows:
        die("play-by-play file has no rows")

    events = []
    for r in rows:
        if r.get("season_type") != "REG":
            continue
        week = int(r["week"])
        base = {"week": week, "game": r.get("game_id"), "team": r.get("posteam"),
                "qtr": r.get("qtr"), "desc": (r.get("desc") or "")[:140]}
        scorer = r.get("td_player_id")
        if scorer in ids:
            kind = ("pass" if r.get("pass_touchdown") == "1" else
                    "rush" if r.get("rush_touchdown") == "1" else
                    "return" if r.get("return_touchdown") == "1" else "other")
            events.append({**base, "id": scorer, "kind": kind})
        passer = r.get("passer_player_id")
        if r.get("pass_touchdown") == "1" and passer in ids:
            events.append({**base, "id": passer, "kind": "threw"})

    weeks_seen = {int(r["week"]) for r in rows if r.get("season_type") == "REG"}
    through = max(weeks_seen) if weeks_seen else 0
    counts = defaultdict(int)
    for e in events:
        counts[e["id"]] += 1

    # --- decrease guard -------------------------------------------------------
    drops = [(p["name"], p["td"], counts[p["id"]] + p["adjust"])
             for p in players if counts[p["id"]] + p["adjust"] < p["td"]]
    if drops and not args.allow_decrease:
        for name, old, new in drops:
            print(f"sync: {name}: {old} -> {new}", file=sys.stderr)
        die("a total went DOWN; re-run with --allow-decrease if this is a real correction", 2)

    # --- rewrite player lines in place ---------------------------------------
    changed = []
    for p in players:
        new = counts[p["id"]] + p["adjust"]
        if new != p["td"]:
            changed.append((p["name"], p["td"], new))
        m = PLAYER_RE.match(lines[p["line"]])
        lines[p["line"]] = f'{m["pre"]}td: {new}{m["adj"] or ""}{m["post"]}'

    # --- machine-owned sync block --------------------------------------------
    now = dt.datetime.now(dt.timezone.utc).replace(microsecond=0).isoformat()
    block = [SYNC_BEGIN,
             "POOL.sync = " + json.dumps({
                 "source": f"nflverse play_by_play_{args.season}",
                 "ran": now, "throughWeek": through, "events": events,
             }, indent=2) + ";",
             SYNC_END]
    if SYNC_BEGIN in lines:
        a, b = lines.index(SYNC_BEGIN), lines.index(SYNC_END)
        lines[a:b + 1] = block
    else:
        lines += [""] + block
    lines = [re.sub(r'updated: "\d{4}-\d{2}-\d{2}"', f'updated: "{now[:10]}"', l) for l in lines]

    text = "\n".join(lines) + "\n"

    # --- the file must still be valid JS before it may land -------------------
    # leading newline matters: data.js ends in a // comment
    probe = text + "\nif (POOL.teams.length !== 9) throw new Error('teams'); " \
                   "if (POOL.teams.flatMap(t=>t.roster).length !== 72) throw new Error('players');"
    r = subprocess.run(["node", "-e", probe], capture_output=True, text=True)
    if r.returncode != 0:
        die(f"rewritten data.js does not parse:\n{r.stderr}")

    total = sum(counts.values())
    print(f"sync: through week {through}, {len(events)} TD events, {total} charged across pool")
    for name, old, new in changed:
        print(f"sync:   {name}: {old} -> {new}")
    if not changed:
        print("sync:   no totals changed")

    if args.dry_run:
        print("sync: dry run, not writing")
        return
    DATA.write_text(text)
    print("sync: wrote data.js")


if __name__ == "__main__":
    main()
