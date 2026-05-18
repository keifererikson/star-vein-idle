export const RESOURCES = {
  iron: {
    id: 'iron',
    name: 'Iron Ore',
    description: 'A common metal that can be sold for a minor profit.',
    baseValue: 3,
    baseXp: 15,
    volumePerUnit: 1,
  },
  carbon: {
    id: 'carbon',
    name: 'Carbon',
    description: 'A basic element used in various manufacturing processes.',
    baseValue: 6,
    baseXp: 5,
    volumePerUnit: 1,
  },
  titanium: {
    id: 'titanium',
    name: 'Titanium',
    description: 'A strong, lightweight metal used in advanced construction. Hard to extract.',
    baseValue: 10,
    baseXp: 30,
    volumePerUnit: 1,
  },
  pyrite: {
    id: 'pyrite',
    name: 'Pyrite',
    description: "Also known as fool's gold. Sells surprisingly well to gullible traders.",
    baseValue: 25,
    baseXp: 10,
    volumePerUnit: 1,
  },
  palladium: {
    id: 'palladium',
    name: 'Palladium',
    description:
      'A precious metal used in electronics and catalytic converters. Extremely valuable.',
    baseValue: 60,
    baseXp: 20,
    volumePerUnit: 1,
  },
  uranium: {
    id: 'uranium',
    name: 'Uranium',
    description: 'A heavy radioactive metal. Requires highly technical extraction.',
    baseValue: 30,
    baseXp: 65,
    volumePerUnit: 1,
  },
} as const

export type ResourceId = keyof typeof RESOURCES

export const SHIPS = {
  frigate: {
    id: 'frigate',
    name: 'Novice Frigate',
    maxSlots: 4,
    maxCargo: 150,
    baseSpeed: 10,
    description: 'A basic frigate suitable for novice space travelers.',
  },
} as const

export type ShipId = keyof typeof SHIPS

export const SYSTEMS = {
  'anchor-point': {
    id: 'anchor-point',
    name: 'Anchor Point',
    miningUnlockLevel: 1,
    resources: [RESOURCES.iron, RESOURCES.carbon],
  },
  'shattered-belt': {
    id: 'shattered-belt',
    name: 'Shattered Belt',
    miningUnlockLevel: 5,
    resources: [RESOURCES.titanium, RESOURCES.pyrite],
  },
  'vein-terminus': {
    id: 'vein-terminus',
    name: 'Vein Terminus',
    miningUnlockLevel: 10,
    resources: [RESOURCES.palladium, RESOURCES.uranium],
  },
} as const

export type SystemId = keyof typeof SYSTEMS
