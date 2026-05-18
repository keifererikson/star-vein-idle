export const RESOURCES = {
  iron: {
    id: 'iron',
    name: 'Iron Ore',
    description: 'A common metal that can be sold for a minor profit.',
    baseValue: 3,
  },
  carbon: {
    id: 'carbon',
    name: 'Carbon',
    description: 'A basic element used in various manufacturing processes.',
    baseValue: 2,
  },
  titanium: {
    id: 'titanium',
    name: 'Titanium',
    description: 'A strong, lightweight metal used in advanced construction.',
    baseValue: 10,
  },
  pyrite: {
    id: 'pyrite',
    name: 'Pyrite',
    description: "Also known as fool's gold, it has some industrial uses.",
    baseValue: 8,
  },
  palladium: {
    id: 'palladium',
    name: 'Palladium',
    description:
      'A precious metal used in electronics and catalytic converters.',
    baseValue: 50,
  },
  uranium: {
    id: 'uranium',
    name: 'Uranium',
    description: 'A heavy metal used as fuel for nuclear reactors.',
    baseValue: 40,
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
