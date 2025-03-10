const SALT_DATA = [
  {
    name: "Redox_Salts",
    category: "Combustion",
    icon_url: SALT_ICONS["Redox_Salts"],
    material_costs: [
      {
        name: "Spore_Cap",
        baseValue: 10
      }, {
        name: "Copper_ore",
        baseValue: 5
      }
    ]
  },
  {
    name: "Explosive_Salts",
    category: "Combustion",
    icon_url: SALT_ICONS["Explosive_Salts"],
    material_costs: [
      {
        name: "Bullforg_Horn",
        baseValue: 10
      }, {
        name: "Foret_Fibres",
        baseValue: 5
      }, {
        name: "Redox_Salts",
        baseValue: 2
      }
    ]
  },
  {
    name: "Spontaneity_Salts",
    category: "Combustion",
    icon_url: SALT_ICONS["Spontaneity_Salts"],
    material_costs: [
      {
        name: "Pocket_Sand",
        baseValue: 50
      }, {
        name: "Goldfish",
        baseValue: 30
      }, {
        name: "Fly",
        baseValue: 40
      }, {
        name: "Explosive_Salts",
        baseValue: 2
      }
    ]
  },
  {
    name: "Dioxide_Salts",
    category: "Synthesis",
    icon_url: SALT_ICONS["Dioxide_Salts"],
    material_costs: [
      {
        name: "Floof_Ploof",
        baseValue: 10
      }, {
        name: "Dune_Soul",
        baseValue: 2
      }, {
        name: "Scorpie",
        baseValue: 1
      }, {
        name: "Spontaneity_Salts",
        baseValue: 1
      }
    ]
  }, {
    name: "Purple_Salts",
    category: "Synthesis",
    icon_url: SALT_ICONS["Purple_Salts"],
    material_costs: [
      {
        name: "Cracked_Glass",
        baseValue: 25
      },
      {
        name: "Bloach",
        baseValue: 5
      },
      {
        name: "Sentient_Cereal",
        baseValue: 5
      },
      {
        name: "Mousey",
        baseValue: 5
      }, {
        name: "Dioxide_Salts",
        baseValue: 2
      }
    ]
  }, {
    name: "Nullo_Salts",
    icon_url: SALT_ICONS["Nullo_Salts"],
    category: "Synthesis",
    material_costs: [
      {
        name: "Contact_Lense",
        baseValue: 50
      },
      {
        name: "Void_Bar",
        baseValue: 5
      },
      {
        name: "Wispy_Lumber",
        baseValue: 5
      },
      {
        name: "Flycicle",
        baseValue: 5
      }, {
        name: "Frigid_Soul",
        baseValue: 5
      }, {
        name: "Purple_Salts",
        baseValue: 2
      }
    ]
  }
]

const CYCLE_BASE_TIMES = {
  "Combustion": 900,
  "Synthesis": 3600
}

const POWER_COSTS = [
  50,
  50,
  200,
  800,
  3000,
  8000,
  14000,
  20000,
  30000,
  40000,
  50000,
  65000,
  80000,
  100000,
  200000,
  300000,
  400000,
  500000,
  600000,
  700000,
  800000,
  900000,
  1000000,
  1000000,
  1000000,
  1000000
]