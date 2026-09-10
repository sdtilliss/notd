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

## Updating TD counts

Everything the site renders lives in `data.js`. Bump a player's `td` value and the standings,
pot, and card highlighting all recalculate on reload:

```js
{ slot: "RB", name: "Ameer Abdullah", td: 2 }
```

Commit and push — GitHub Pages redeploys automatically.

## Next up

Right now the TD counts are entered by hand. The intended next step is pulling them
automatically from an NFL stats source (weekly scoring data keyed by player) and rewriting
`data.js` on a schedule, so the site updates itself through the season.

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
