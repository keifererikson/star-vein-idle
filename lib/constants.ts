export const RESOURCES = {
  iron: {
    id: 'iron',
    name: 'Iron Ore',
    description: 'A common metal that can be sold for a minor profit.',
    baseValue: 2,
  }
}

export type ResourceId = keyof typeof RESOURCES;

export const SHIPS = {
  frigate: {
    id: 'frigate',
    name: 'Novice Frigate',
    maxSlots: 4,
    maxCargo: 150,
    baseSpeed: 10,
    description: 'A basic frigate suitable for novice space travelers.',
  }
}

export type ShipId = keyof typeof SHIPS;

export const SYSTEMS = {
  'home-station': {
    id: 'home-station',
    name: 'Earth Station',
    coordinates: { x: 0, y: 0 },
    type: 'STATION',
    resources: [],
  },
  'belt-alpha': {
    id: 'belt-alpha',
    name: 'Asteroid Belt Alpha',
    coordinates: { x: 10, y: 5 },
    type: 'ASTEROID_BELT',
    resources: ['iron'],
  }
}

export type SystemId = keyof typeof SYSTEMS;
