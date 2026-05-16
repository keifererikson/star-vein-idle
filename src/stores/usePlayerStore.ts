import { defineStore } from 'pinia'

import type { ResourceId } from '@/lib/constants'
import { processMining } from '@/systems/miningSystem'
import type { PlayerState } from '@/types/game'

const TICK_INTERVAL_MS = 1000

function createInitialState(): PlayerState {
  return {
    currencies: {
      data: 0,
      credits: 1000,
    },
    skills: {
      miningLevel: 1,
    },
    lastTickTimestamp: 0,
    lastSaveTimestamp: 0,
    ship: {
      name: 'SS Venture',
      hullType: 'FRIGATE',
      stats: {
        maxSlots: 4,
        maxCargo: 200,
        baseWarpSpeed: 100,
      },
      modules: [],
      cargo: {},
      cargoUsed: 0,
    },
    status: 'IDLE',
    mining: {
      targetResourceId: null,
      cycleStartTime: 0,
      cycleDuration: 0,
    },
  }
}

let tickTimer: ReturnType<typeof setInterval> | null = null

export const usePlayerStore = defineStore('player', {
  state: (): PlayerState => createInitialState(),

  getters: {
    creditsFormatted: (state) => state.currencies.credits.toLocaleString(),
    cargoSummary: (state) =>
      `${state.ship.cargoUsed}/${state.ship.stats.maxCargo} m³`,
  },

  actions: {
    tick(deltaMs: number = TICK_INTERVAL_MS) {
      this.lastTickTimestamp += deltaMs
      processMining(this.$state, deltaMs)
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
    },

    jettison() {
      this.ship.cargo = {}
      this.ship.cargoUsed = 0
    },

    markSaved() {
      this.lastSaveTimestamp = Date.now()
    },

    startTickEngine() {
      if (tickTimer !== null) return
      tickTimer = setInterval(() => {
        this.tick(TICK_INTERVAL_MS)
      }, TICK_INTERVAL_MS)
    },

    stopTickEngine() {
      if (tickTimer === null) return
      clearInterval(tickTimer)
      tickTimer = null
    },
  },

  persist: {
    key: 'star-vein-idle-player',
    pick: [
      'currencies',
      'skills',
      'lastTickTimestamp',
      'lastSaveTimestamp',
      'ship',
      'status',
      'mining',
    ],
    afterHydrate: (ctx) => {
      ctx.store.lastTickTimestamp = 0
    },
  },
})
