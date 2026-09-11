/* No TDs Pool 2026 — renders the tracker from POOL (see data.js). */
(function () {
  "use strict";

  var SLOT_ORDER = { RB: 0, WR: 1, TE: 2, Flex: 3 };

  var el = function (id) { return document.getElementById(id); };
  var total = function (team) {
    return team.roster.reduce(function (n, p) { return n + (p.td || 0); }, 0);
  };

  /* Teams with totals, ranked ascending (fewest TDs = rank 1, ties share a rank). */
  function rank(teams) {
    var rows = teams.map(function (t, i) {
      return { owner: t.owner, roster: t.roster, total: total(t), draft: i };
    });
    var sorted = rows.slice().sort(function (a, b) {
      return a.total - b.total || a.draft - b.draft;
    });
    var place = 0, prev = null;
    sorted.forEach(function (r, i) {
      if (r.total !== prev) { place = i + 1; prev = r.total; }
      r.rank = place;
    });
    return sorted;
  }

  function renderStats(ranked) {
    var tds = ranked.reduce(function (n, r) { return n + r.total; }, 0);
    var pot = POOL.buyIn.base * ranked.length + POOL.buyIn.perTd * tds;
    var clean = ranked.reduce(function (n, r) {
      return n + r.roster.filter(function (p) { return !p.td; }).length;
    }, 0);
    var players = ranked.reduce(function (n, r) { return n + r.roster.length; }, 0);

    el("stat-pot").textContent = "$" + pot.toLocaleString();
    el("stat-tds").textContent = String(tds);
    el("stat-clean").textContent = clean + "/" + players;
  }

  function renderStandings(ranked) {
    var list = el("standings");
    var best = ranked[0].total;
    var leaders = ranked.filter(function (r) { return r.total === best; });
    var everyoneTied = leaders.length === ranked.length;

    list.innerHTML = "";

    ranked.forEach(function (r) {
      var li = document.createElement("li");
      var isLeader = !everyoneTied && r.total === best;
      li.className = "row" + (isLeader ? " is-leader" : "") + (r.total ? " burned" : "");

      li.innerHTML =
        '<span class="rank">' + r.rank + "</span>" +
        '<span class="who">' + esc(r.owner) +
          (isLeader ? '<span class="tag">Leads</span>' : "") +
        "</span>" +
        tally(r.total) +
        '<span class="tds">' + r.total + "</span>";

      list.appendChild(li);
    });

    var note = document.createElement("p");
    note.className = "tie-note";
    note.textContent = everyoneTied
      ? "All nine tied at " + best + ". Nobody has been burned yet."
      : leaders.length > 1
        ? leaders.length + "-way tie at the top. Ties split the pot."
        : leaders[0].owner + " leads at " + best + " TD" + (best === 1 ? "" : "s") + " allowed.";
    list.parentNode.appendChild(note);
  }

  function renderTeams(ranked, mode) {
    var wrap = el("teams");
    var best = ranked[0].total;
    var everyoneTied = ranked.every(function (r) { return r.total === best; });
    var rows = mode === "draft"
      ? ranked.slice().sort(function (a, b) { return a.draft - b.draft; })
      : ranked;

    wrap.innerHTML = "";

    rows.forEach(function (r) {
      var card = document.createElement("article");
      var isLeader = !everyoneTied && r.total === best;
      card.className = "team" + (isLeader ? " is-leader" : "") + (r.total ? " burned" : "");

      var roster = r.roster.slice().sort(function (a, b) {
        return (SLOT_ORDER[a.slot] ?? 9) - (SLOT_ORDER[b.slot] ?? 9);
      });

      card.innerHTML =
        '<div class="team-head">' +
          "<h3>" + esc(r.owner) + (isLeader ? '<span class="tag">Leads</span>' : "") + "</h3>" +
          '<span class="team-total">' + r.total + "<small>TD" + (r.total === 1 ? "" : "s") + "</small></span>" +
        "</div>" +
        '<ul class="roster">' +
          roster.map(function (p) {
            return '<li class="player' + (p.td ? " scored" : "") + '">' +
              '<span class="slot">' + esc(p.slot) + "</span>" +
              '<span class="pname" title="' + esc(p.name) + '">' + esc(p.name) + "</span>" +
              '<span class="ptd">' + (p.td ? p.td : "–") + "</span>" +
            "</li>";
          }).join("") +
        "</ul>";

      wrap.appendChild(card);
    });
  }

  function renderRules() {
    el("rules").innerHTML = POOL.rules.map(function (r) {
      return "<li>" + esc(r) + "</li>";
    }).join("");
  }

  /* n touchdowns as tally marks: full groups of five get the strike. */
  function tally(n) {
    if (!n) return "";
    var out = [];
    for (var full = Math.floor(n / 5); full > 0; full--) out.push('<span class="g5" style="--n:4"></span>');
    var rem = n % 5;
    if (rem) out.push('<span style="--n:' + rem + '"></span>');
    return '<span class="tally" aria-hidden="true">' + out.join("") + "</span>";
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function init() {
    var ranked = rank(POOL.teams);

    renderStats(ranked);
    renderStandings(ranked);
    renderTeams(ranked, "standings");
    renderRules();

    var d = new Date(POOL.updated + "T12:00:00Z");
    var t = el("updated");
    t.dateTime = POOL.updated;
    t.textContent = d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });

    document.querySelectorAll(".toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".toggle button").forEach(function (b) {
          b.classList.remove("is-active");
        });
        btn.classList.add("is-active");
        renderTeams(ranked, btn.dataset.sort);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
