/* No TDs Pool 2026 — source of truth for the site.
 * Sourced from the "No TDs Pool 2026" Google Sheet.
 * To update TD counts, edit the `td` values below (or have a script rewrite this file).
 */
const POOL = {
  season: 2026,
  updated: "2026-09-10",
  buyIn: { base: 20, perTd: 10 },
  rules: [
    "Buy in for everyone: $20 base + $10 per TD scored.",
    "Winner take all.",
    "All drafted players MUST be on the week 1 53-man roster for their respective NFL teams. IR, PUP, NFI, practice squad, and commissioner exempt list players do NOT count as eligible.",
    "No substitutions or roster changes throughout the season for any reason. If your guy gets cut, injured, or sent to the practice squad, you benefit.",
    "Cumulative scoring: the team with the LEAST total accumulated TDs throughout the 2026 regular season (weeks 1–18) wins.",
    "Any and all ties are settled with even pot splits instead of tiebreaks to determine a sole winner.",
    "Passing TDs thrown by RB/WR/TE count as TDs and are penalized as such.",
    "Kick/punt return TDs count the same as offensive TDs and are penalized as such. So do any miscellaneous TDs, such as landing on a fumble in the end zone."
  ],
  slots: ["RB", "RB", "WR", "WR", "TE", "TE", "Flex", "Flex"],
  teams: [
    { owner: "Brett", roster: [
      { slot: "RB",   name: "Dylan Laube",        td: 0 },
      { slot: "RB",   name: "Rasheen Ali",        td: 0 },
      { slot: "WR",   name: "Brycen Tremayne",   td: 0 },
      { slot: "WR",   name: "Chris Blair",        td: 0 },
      { slot: "TE",   name: "Nick Kallerup",      td: 0 }, // wk1: inactive scratch, on the 53 — ruled eligible
      { slot: "TE",   name: "Gavin Bartholomew",  td: 0 },
      { slot: "Flex", name: "Camden Brown",       td: 0 },
      { slot: "Flex", name: "Ian Thomas",         td: 0 }
    ]},
    { owner: "Schneck", roster: [
      { slot: "RB",   name: "Julius Chestnut",       td: 0 },
      { slot: "RB",   name: "Roschon Johnson",       td: 0 },
      { slot: "WR",   name: "Simi Fehoko",           td: 0 },
      { slot: "WR",   name: "J Michael Sturdivant",  td: 0 },
      { slot: "TE",   name: "Bauer Sharp",           td: 0 },
      { slot: "TE",   name: "Hunter Long",           td: 0 },
      { slot: "Flex", name: "Dallen Bentley",        td: 0 },
      { slot: "Flex", name: "Ko Kieft",              td: 0 }
    ]},
    { owner: "Tilly", roster: [
      { slot: "RB",   name: "Ameer Abdullah",    td: 0 },
      { slot: "RB",   name: "Ronnie Rivers",     td: 0 },
      { slot: "WR",   name: "Dohnte Meyers",     td: 0 },
      { slot: "WR",   name: "CJ Williams",       td: 0 },
      { slot: "TE",   name: "Feleipe Franks",    td: 0 },
      { slot: "TE",   name: "Mark Redman",       td: 0 },
      { slot: "Flex", name: "Thomas Fidone II",  td: 0 },
      { slot: "Flex", name: "Brevin Jordan",     td: 0 }
    ]},
    { owner: "Mitch", roster: [
      { slot: "RB",   name: "Kene Nwangwu",     td: 0 },
      { slot: "RB",   name: "Audric Estime",    td: 0 },
      { slot: "WR",   name: "Laquon Treadwell", td: 0 },
      { slot: "WR",   name: "Arian Smith",      td: 0 },
      { slot: "TE",   name: "Colson Yankoff",  td: 0 },
      { slot: "TE",   name: "Quintin Morris",   td: 0 },
      { slot: "Flex", name: "Seydou Traore",    td: 0 },
      { slot: "Flex", name: "Charlie Woerner",  td: 0 }
    ]},
    { owner: "Desch", roster: [
      { slot: "RB",   name: "Corey Kiner",      td: 0 },
      { slot: "RB",   name: "Will Shipley",     td: 0 },
      { slot: "WR",   name: "Darius Cooper",    td: 0 },
      { slot: "WR",   name: "Ashton Dulin",     td: 0 },
      { slot: "TE",   name: "Jake Briningstool", td: 0 },
      { slot: "TE",   name: "Jackson Meeks",    td: 0 },
      { slot: "Flex", name: "Ben Yurosek",      td: 0 }, // drafted the day before he hit IR — ruled legal
      { slot: "Flex", name: "EJ Jenkins",       td: 0 }
    ]},
    { owner: "Lec", roster: [
      { slot: "RB",   name: "Raheim Sanders", td: 0 },
      { slot: "RB",   name: "Tyler Badie",    td: 0 },
      { slot: "WR",   name: "Ryan Miller",    td: 0 },
      { slot: "WR",   name: "Jared Wayne",    td: 0 },
      { slot: "TE",   name: "Tanner Arkin",   td: 0 },
      { slot: "TE",   name: "Carsen Ryan",    td: 0 },
      { slot: "Flex", name: "Josh Cameron",   td: 0 },
      { slot: "Flex", name: "Jalen Brooks",   td: 0 }
    ]},
    { owner: "Seth", roster: [
      { slot: "RB",   name: "Eli Heidenreich", td: 0 },
      { slot: "RB",   name: "Devin Singletary", td: 0 },
      { slot: "WR",   name: "CJ Daniels",      td: 0 },
      { slot: "WR",   name: "Reggie Virgil",   td: 0 },
      { slot: "TE",   name: "Keleki Latu",     td: 0 },
      { slot: "TE",   name: "Jack Endries",    td: 0 },
      { slot: "Flex", name: "Josh Cuevas",     td: 0 },
      { slot: "Flex", name: "Jeremy Ruckert",  td: 0 }
    ]},
    { owner: "Jarett", roster: [
      { slot: "RB",   name: "Jacob Saylors", td: 0 },
      { slot: "RB",   name: "DJ Giddens",    td: 0 },
      { slot: "WR",   name: "Nikko Remigio", td: 0 },
      { slot: "WR",   name: "Derius Davis",  td: 0 },
      { slot: "TE",   name: "Jelani Woods",  td: 0 },
      { slot: "TE",   name: "Justin Joly",   td: 0 },
      { slot: "Flex", name: "Marlin Klein",  td: 0 },
      { slot: "Flex", name: "Cade Stover",   td: 0 }
    ]},
    { owner: "Shaps", roster: [
      { slot: "RB",   name: "Sione Vaki",              td: 0 },
      { slot: "RB",   name: "Tahj Brooks",             td: 0 },
      { slot: "WR",   name: "LaJohntay Wester",        td: 0 },
      { slot: "WR",   name: "Dareke Young",            td: 0 },
      { slot: "TE",   name: "Chris Manhertz",          td: 0 },
      { slot: "TE",   name: "David Martin-Robinson",   td: 0 },
      { slot: "Flex", name: "Kaden Wetjen",            td: 0 },
      { slot: "Flex", name: "Jared Wiley",             td: 0 }
    ]}
  ]
};
