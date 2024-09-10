const SALT_DATA = [
  {
    name: "Redox_Salts",
    category: "Combustion",
    icon_url: SALT_ICONS["Redox_Salts"],
    material_costs: [
      {
        name: "Spore_Cap",
        icon: "https://idleon.wiki/wiki/images/thumb/7/7c/Spore_Cap.png/50px-Spore_Cap.png",
        baseValue: 10
      }, {
        name: "Copper_ore",
        icon: "https://idleon.wiki/wiki/images/thumb/7/78/Copper_Ore.png/50px-Copper_Ore.png",
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
        icon: "https://idleon.wiki/wiki/images/thumb/5/56/Bullfrog_Horn.png/50px-Bullfrog_Horn.png",
        baseValue: 10
      }, {
        name: "Foret_Fibres",
        icon: "https://idleon.wiki/wiki/images/thumb/b/b2/Forest_Fibres.png/50px-Forest_Fibres.png",
        baseValue: 5
      }, {
        name: "Redox_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/c/cb/Redox_Salts.png/50px-Redox_Salts.png",
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
        icon: "https://idleon.wiki/wiki/images/thumb/8/8c/Pocket_Sand.png/50px-Pocket_Sand.png",
        baseValue: 50
      }, {
        name: "Goldfish",
        icon: "https://idleon.wiki/wiki/images/thumb/0/02/Goldfish.png/50px-Goldfish.png",
        baseValue: 30
      }, {
        name: "Fly",
        icon: "https://idleon.wiki/wiki/images/thumb/0/0c/Fly.png/50px-Fly.png",
        baseValue: 40
      }, {
        name: "Explosive_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2f/Explosive_Salts.png/50px-Explosive_Salts.png",
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
        icon: "https://idleon.wiki/wiki/images/thumb/0/08/Floof_Ploof.png/50px-Floof_Ploof.png",
        baseValue: 10
      }, {
        name: "Dune_Soul",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2e/Dune_Soul.png/50px-Dune_Soul.png",
        baseValue: 2
      }, {
        name: "Scorpie",
        icon: "https://idleon.wiki/wiki/images/thumb/2/2e/Scorpie.png/50px-Scorpie.png",
        baseValue: 1
      }, {
        name: "Spontaneity_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/3/3e/Spontaneity_Salts.png/50px-Spontaneity_Salts.png",
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
        icon: "https://idleon.wiki/wiki/images/thumb/2/20/Cracked_Glass.png/50px-Cracked_Glass.png",
        baseValue: 25
      },
      {
        name: "Bloach",
        icon: "https://idleon.wiki/wiki/images/thumb/c/c8/Bloach.png/50px-Bloach.png",
        baseValue: 5
      },
      {
        name: "Sentient_Cereal",
        icon: "https://idleon.wiki/wiki/images/thumb/0/04/Sentient_Cereal.png/50px-Sentient_Cereal.png",
        baseValue: 5
      },
      {
        name: "Mousey",
        icon: "https://idleon.wiki/wiki/images/thumb/d/db/Mousey.png/50px-Mousey.png",
        baseValue: 5
      }, {
        name: "Dioxide_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/9/96/Dioxide_Synthesis.png/50px-Dioxide_Synthesis.png",
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
        icon: "https://idleon.wiki/wiki/images/thumb/4/48/Contact_Lense.png/50px-Contact_Lense.png",
        baseValue: 50
      },
      {
        name: "Void_Bar",
        icon: "https://idleon.wiki/wiki/images/thumb/4/4d/Void_Bar.png/50px-Void_Bar.png",
        baseValue: 5
      },
      {
        name: "Wispy_Lumber",
        icon: "https://idleon.wiki/wiki/images/thumb/0/01/Wispy_Lumber.png/50px-Wispy_Lumber.png",
        baseValue: 5
      },
      {
        name: "Flycicle",
        icon: "https://idleon.wiki/wiki/images/thumb/a/ab/Flycicle.png/50px-Flycicle.png",
        baseValue: 5
      }, {
        name: "Frigid_Soul",
        icon: "https://idleon.wiki/wiki/images/thumb/3/30/Frigid_Soul.png/50px-Frigid_Soul.png",
        baseValue: 5
      }, {
        name: "Purple_Salts",
        icon: "https://idleon.wiki/wiki/images/thumb/f/fb/Purple_Salt.png/50px-Purple_Salt.png",
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