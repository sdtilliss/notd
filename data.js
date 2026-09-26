/* No TDs Pool 2026 — source of truth for the site.
 * Sourced from the "No TDs Pool 2026" Google Sheet.
 * To update TD counts, edit the `td` values below (or have a script rewrite this file).
 */
const POOL = {
  season: 2026,
  updated: "2026-09-26",
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
      { slot: "RB",   name: "Dylan Laube",        id: "00-0039407", td: 0 },
      { slot: "RB",   name: "Rasheen Ali",        id: "00-0039796", td: 0 },
      { slot: "WR",   name: "Brycen Tremayne",   id: "00-0038840", td: 0 },
      { slot: "WR",   name: "Chris Blair",        id: "00-0036463", td: 0 },
      { slot: "TE",   name: "Nick Kallerup",      id: "00-0040058", td: 0 }, // wk1: inactive scratch, on the 53 — ruled eligible
      { slot: "TE",   name: "Gavin Bartholomew",  id: "00-0040215", td: 0 },
      { slot: "Flex", name: "Camden Brown",       id: "00-0040930", td: 0 },
      { slot: "Flex", name: "Ian Thomas",         id: "00-0034365", td: 0 }
    ]},
    { owner: "Schneck", roster: [
      { slot: "RB",   name: "Julius Chestnut",       id: "00-0037594", td: 0 },
      { slot: "RB",   name: "Roschon Johnson",       id: "00-0039021", td: 0 },
      { slot: "WR",   name: "Simi Fehoko",           id: "00-0036646", td: 0 },
      { slot: "WR",   name: "J Michael Sturdivant",  id: "00-0040948", td: 0 },
      { slot: "TE",   name: "Bauer Sharp",           id: "00-0041094", td: 0 },
      { slot: "TE",   name: "Hunter Long",           id: "00-0037004", td: 0 },
      { slot: "Flex", name: "Dallen Bentley",        id: "00-0041133", td: 0 },
      { slot: "Flex", name: "Ko Kieft",              id: "00-0037311", td: 0 }
    ]},
    { owner: "Tilly", roster: [
      { slot: "RB",   name: "Ameer Abdullah",    id: "00-0032104", td: 0 },
      { slot: "RB",   name: "Ronnie Rivers",     id: "00-0037557", td: 0 },
      { slot: "WR",   name: "Dohnte Meyers",     id: "00-0040785", td: 0 },
      { slot: "WR",   name: "CJ Williams",       id: "00-0041106", td: 0 },
      { slot: "TE",   name: "Feleipe Franks",    id: "00-0036825", td: 0 },
      { slot: "TE",   name: "Mark Redman",       id: "00-0040598", td: 0 },
      { slot: "Flex", name: "Thomas Fidone II",  id: "00-0040225", td: 0 },
      { slot: "Flex", name: "Brevin Jordan",     id: "00-0036556", td: 0 }
    ]},
    { owner: "Mitch", roster: [
      { slot: "RB",   name: "Kene Nwangwu",     id: "00-0036842", td: 0 },
      { slot: "RB",   name: "Audric Estime",    id: "00-0039373", td: 0 },
      { slot: "WR",   name: "Laquon Treadwell", id: "00-0032951", td: 0 },
      { slot: "WR",   name: "Arian Smith",      id: "00-0040582", td: 0 },
      { slot: "TE",   name: "Colson Yankoff",  id: "00-0039686", td: 0 },
      { slot: "TE",   name: "Quintin Morris",   id: "00-0036590", td: 0 },
      { slot: "Flex", name: "Seydou Traore",    id: "00-0041579", td: 0 },
      { slot: "Flex", name: "Charlie Woerner",  id: "00-0036429", td: 0 }
    ]},
    { owner: "Desch", roster: [
      { slot: "RB",   name: "Corey Kiner",      id: "00-0040556", td: 0 },
      { slot: "RB",   name: "Will Shipley",     id: "00-0039746", td: 0 },
      { slot: "WR",   name: "Darius Cooper",    id: "00-0040024", td: 1 },
      { slot: "WR",   name: "Ashton Dulin",     id: "00-0035021", td: 0 },
      { slot: "TE",   name: "Jake Briningstool", id: "00-0040081", td: 0 },
      { slot: "TE",   name: "Jackson Meeks",    id: "00-0040390", td: 0 },
      { slot: "Flex", name: "Ben Yurosek",      id: "00-0040509", td: 0 }, // drafted the day before he hit IR — ruled legal
      { slot: "Flex", name: "EJ Jenkins",       id: "00-0038498", td: 0 }
    ]},
    { owner: "Lec", roster: [
      { slot: "RB",   name: "Raheim Sanders", id: "00-0040466", td: 0 },
      { slot: "RB",   name: "Tyler Badie",    id: "00-0037085", td: 0 },
      { slot: "WR",   name: "Ryan Miller",    id: "00-0038824", td: 1 },
      { slot: "WR",   name: "Jared Wayne",    id: "00-0038728", td: 0 },
      { slot: "TE",   name: "Tanner Arkin",   id: "00-0041314", td: 0 },
      { slot: "TE",   name: "Carsen Ryan",    id: "00-0041131", td: 0 },
      { slot: "Flex", name: "Josh Cameron",   id: "00-0041100", td: 1 },
      { slot: "Flex", name: "Jalen Brooks",   id: "00-0038640", td: 0 }
    ]},
    { owner: "Seth", roster: [
      { slot: "RB",   name: "Eli Heidenreich", id: "00-0041490", td: 0 },
      { slot: "RB",   name: "Devin Singletary", id: "00-0035250", td: 1 },
      { slot: "WR",   name: "CJ Daniels",      id: "00-0041399", td: 0 },
      { slot: "WR",   name: "Reggie Virgil",   id: "00-0041070", td: 0 },
      { slot: "TE",   name: "Keleki Latu",     id: "00-0040363", td: 0 },
      { slot: "TE",   name: "Jack Endries",    id: "00-0041116", td: 0 },
      { slot: "Flex", name: "Josh Cuevas",     id: "00-0040887", td: 0 },
      { slot: "Flex", name: "Jeremy Ruckert",  id: "00-0037805", td: 0 }
    ]},
    { owner: "Jarett", roster: [
      { slot: "RB",   name: "Jacob Saylors", id: "00-0038896", td: 0 },
      { slot: "RB",   name: "DJ Giddens",    id: "00-0040179", td: 0 },
      { slot: "WR",   name: "Nikko Remigio", id: "00-0038519", td: 0 },
      { slot: "WR",   name: "Derius Davis",  id: "00-0038573", td: 0 },
      { slot: "TE",   name: "Jelani Woods",  id: "00-0037755", td: 0 },
      { slot: "TE",   name: "Justin Joly",   id: "00-0041077", td: 0 },
      { slot: "Flex", name: "Marlin Klein",  id: "00-0041472", td: 0 },
      { slot: "Flex", name: "Cade Stover",   id: "00-0039359", td: 0 }
    ]},
    { owner: "Shaps", roster: [
      { slot: "RB",   name: "Sione Vaki",              id: "00-0039364", td: 0 },
      { slot: "RB",   name: "Tahj Brooks",             id: "00-0040208", td: 0 },
      { slot: "WR",   name: "LaJohntay Wester",        id: "00-0040075", td: 0 },
      { slot: "WR",   name: "Dareke Young",            id: "00-0037093", td: 0 },
      { slot: "TE",   name: "Chris Manhertz",          id: "00-0031484", td: 0 },
      { slot: "TE",   name: "David Martin-Robinson",   id: "00-0039648", td: 0 },
      { slot: "Flex", name: "Kaden Wetjen",            id: "00-0041397", td: 0 },
      { slot: "Flex", name: "Jared Wiley",             id: "00-0039824", td: 0 }
    ]}
  ]
};

// --- BEGIN SYNC (rewritten by scripts/sync.py; do not hand-edit) ---
POOL.sync = {
  "source": "nflverse play_by_play_2026",
  "ran": "2026-09-26T14:15:20+00:00",
  "throughWeek": 3,
  "events": [
    {
      "week": 1,
      "game": "2026_01_CLE_JAX",
      "team": "JAX",
      "qtr": "1",
      "desc": "(1:47) 16-T.Lawrence pass short middle to 19-J.Cameron for 4 yards, TOUCHDOWN.",
      "id": "00-0041100",
      "kind": "pass"
    },
    {
      "week": 1,
      "game": "2026_01_DAL_NYG",
      "team": "NYG",
      "qtr": "4",
      "desc": "(7:31) (Shotgun) 6-J.Dart pass short left to 26-D.Singletary for 9 yards, TOUCHDOWN.",
      "id": "00-0035250",
      "kind": "pass"
    },
    {
      "week": 2,
      "game": "2026_02_MIA_SF",
      "team": "MIA",
      "qtr": "4",
      "desc": "(2:41) (Shotgun) 2-M.Willis pass deep right to 84-R.Miller for 77 yards, TOUCHDOWN.",
      "id": "00-0038824",
      "kind": "pass"
    },
    {
      "week": 2,
      "game": "2026_02_PHI_TEN",
      "team": "PHI",
      "qtr": "4",
      "desc": "(:14) (Shotgun) 1-J.Hurts pass short middle to 80-D.Cooper for 3 yards, TOUCHDOWN.",
      "id": "00-0040024",
      "kind": "pass"
    }
  ]
};
// --- END SYNC ---
