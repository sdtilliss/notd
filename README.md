# No TDs Pool 2026

A dead-simple tracker for the 2026 No TDs Pool. **Fewest touchdowns wins.**

Nine managers, eight players each (2 RB / 2 WR / 2 TE / 2 Flex), drafted off the back of NFL
depth charts. Every touchdown any of your players scores counts *against* you. Least total
TDs across weeks 1–18 takes the pot.

## Stack

Static HTML/CSS/JS. No build step, no dependencies, no framework. Open `index.html` in a
browser and it works.

```
index.html        page shell
assets/styles.css styling
assets/app.js     renders standings + rosters from the data
data.js           the pool data (rosters, TD counts, rules)
```

## How TD counts update

A GitHub Action runs `scripts/sync.py` every morning at 10:00 UTC (6am ET)
from September through January. It downloads the season's play-by-play from
[nflverse](https://github.com/nflverse/nflverse-data), recomputes every
player's total from zero, rewrites `data.js`, and pushes. Vercel redeploys on
the push. Nothing runs on the site itself; it stays a flat file.

Players are tracked by `gsis_id`, never by name. A player is charged for every
play where he is the credited scorer (rushing, receiving, returns, fumble
recoveries -- everything) plus every passing touchdown he throws, which is how
the pool's rules read.

`data.js` carries two things the sync maintains:

```js
{ slot: "RB", name: "Ameer Abdullah", id: "00-0031285", td: 0 }   // td is machine-written
POOL.sync = { ran, throughWeek, events: [...] }                    // every TD, with the play text
```

The sync refuses to write anything if the download fails, if any pool id is
missing from the roster file, if the rewritten file does not parse, or if a
total would go *down*. That last one exists so an upstream stat correction
gets a human look instead of silently taking points off someone's board:

```
Actions -> Sync TD totals -> Run workflow -> tick "allow_decrease"
```

For commissioner rulings on strange plays, add an `adjust` to the player line.
It is added to the computed count and survives every sync:

```js
{ slot: "TE", name: "Jelani Woods", id: "00-0037738", td: 1, adjust: -1 }
```

Run it locally with `python3 scripts/sync.py --dry-run` to see what would
change without writing.

## Rules

- Buy in: $20 base + $10 per TD scored. Winner take all.
- All drafted players had to be on their team's week 1 53-man roster. IR, PUP, NFI, practice
  squad, and commissioner exempt list do not count as eligible.
- No substitutions or roster changes all season, for any reason. If your guy gets cut or hurt,
  you benefit.
- Cumulative scoring, weeks 1–18. Least total TDs wins.
- Ties split the pot evenly — no tiebreakers.
- Passing TDs thrown by a RB/WR/TE count against you.
- Kick/punt return TDs and miscellaneous TDs (recovering a fumble in the end zone, etc.) count
  the same as offensive TDs.
