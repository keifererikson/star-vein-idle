import { createShipFromHull } from '@/lib/shipFactory'
import type { PlayerState } from '@/types/game'

export const SAVE_VERSION = 1

export function migratePlayerState(state: PlayerState): void {
  const version = state.saveVersion ?? 0

  if (version < 1) {
    migrateToV1(state)
  }

  state.saveVersion = SAVE_VERSION
}

function migrateToV1(state: PlayerState): void {
  const legacyShip = state.ship as PlayerState['ship'] & { cargoUsed?: number }
  const hullDefaults = createShipFromHull('frigate')

  const legacyStats = legacyShip.stats

  state.ship = {
    ...hullDefaults,
    name: legacyShip.name ?? hullDefaults.name,
    hullType: legacyShip.hullType ?? hullDefaults.hullType,
    modules: legacyShip.modules ?? [],
    cargo: legacyShip.cargo ?? {},
    stats: {
      maxSlots: legacyStats?.maxSlots ?? hullDefaults.stats.maxSlots,
      maxCargo: legacyStats?.maxCargo ?? hullDefaults.stats.maxCargo,
      baseWarpSpeed:
        legacyStats?.baseWarpSpeed ?? hullDefaults.stats.baseWarpSpeed,
    },
  }

  if (state.skills?.miningLevel === undefined) {
    state.skills = { miningLevel: 1 }
  }

  if (state.lastActiveTimestamp === undefined) {
    // Prior field tracked session elapsed ms, not wall clock — do not use for offline catch-up.
    state.lastActiveTimestamp = Date.now()
  }

  if (state.mining.cycleDuration <= 0 && state.status === 'MINING') {
    state.status = 'IDLE'
    state.mining.targetResourceId = null
    state.mining.cycleStartTime = 0
    state.mining.cycleDuration = 0
  }
}
