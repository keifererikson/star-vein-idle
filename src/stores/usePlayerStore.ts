import { defineStore } from 'pinia'

import { getCargoUsed } from '@/lib/cargo'
import type { ResourceId } from '@/lib/constants'
import { migratePlayerState, SAVE_VERSION } from '@/lib/saveMigration'
import { createShipFromHull } from '@/lib/shipFactory'
import { processMining } from '@/systems/miningSystem'
import type { PlayerState } from '@/types/game'

const TICK_INTERVAL_MS = 1000

function createInitialState(): PlayerState {
  return {
    saveVersion: SAVE_VERSION,
    currencies: {
      data: 0,
      credits: 1000,
    },
    skills: {
      miningLevel: 1,
    },
    lastActiveTimestamp: 0,
    lastSaveTimestamp: 0,
    ship: createShipFromHull('frigate'),
    status: 'IDLE',
    mining: {
      targetResourceId: null,
      cycleStartTime: 0,
      cycleDuration: 0,
    },
  }
}

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => createInitialState(),

  getters: {
    creditsFormatted: (state) => state.currencies.credits.toLocaleString(),
    cargoUsed: (state) => getCargoUsed(state.ship.cargo),
    cargoSummary: (state) => {
      const used = getCargoUsed(state.ship.cargo)
      return `${used}/${state.ship.stats.maxCargo} m³`
    },
  },

  actions: {
    tick(deltaMs: number = TICK_INTERVAL_MS) {
      processMining(this.$state, deltaMs)
      this.lastActiveTimestamp = Date.now()
    },

    catchUpFromLastActive() {
      const last = this.lastActiveTimestamp
      if (last <= 0) return

      const elapsed = Date.now() - last
      if (elapsed > 0) {
        this.tick(elapsed)
      } else {
        this.lastActiveTimestamp = Date.now()
      }
    },

    startMining(resourceId: ResourceId) {
      this.status = 'MINING'
      this.mining.targetResourceId = resourceId
      this.mining.cycleStartTime = 0
      this.mining.cycleDuration = 2000
    },

    stopMining() {
      this.status = 'IDLE'
      this.mining.targetResourceId = null
      this.mining.cycleStartTime = 0
      this.mining.cycleDuration = 0
    },

    jettison() {
      this.ship.cargo = {}
    },

    markCheckpoint() {
      this.lastSaveTimestamp = Date.now()
      this.$persist()
    },
  },

  persist: {
    key: 'star-vein-idle-player',
    pick: [
      'saveVersion',
      'currencies',
      'skills',
      'lastActiveTimestamp',
      'lastSaveTimestamp',
      'ship',
      'status',
      'mining',
    ],
    afterHydrate: (ctx) => {
      migratePlayerState(ctx.store.$state as PlayerState)
      ctx.store.catchUpFromLastActive()
    },
  },
})
