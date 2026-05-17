import { SHIPS, type ShipId } from '@/lib/constants'
import type { Ship } from '@/types/game'

export function createShipFromHull(
  hullId: ShipId,
  overrides?: Partial<Pick<Ship, 'name'>>,
): Ship {
  const hull = SHIPS[hullId]

  return {
    name: overrides?.name ?? hull.name,
    hullType: 'FRIGATE',
    stats: {
      maxSlots: hull.maxSlots,
      maxCargo: hull.maxCargo,
      baseWarpSpeed: hull.baseSpeed * 10,
    },
    modules: [],
    cargo: {},
  }
}
