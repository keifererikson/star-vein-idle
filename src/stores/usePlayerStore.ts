import { defineStore } from 'pinia'

import { getCargoUsed } from '@/lib/cargo'
import { type ResourceId, type SystemId, SYSTEMS } from '@/lib/constants'
import { migratePlayerState, SAVE_VERSION } from '@/lib/saveMigration'
import { createShipFromHull } from '@/lib/shipFactory'
import { getLevelFromXp } from '@/lib/skills'
import { sellAllCargo, sellResource } from '@/systems/marketSystem'
import { processMining } from '@/systems/miningSystem'
import type { PlayerState, SkillId } from '@/types/game'

function createInitialState(): PlayerState {
  return {
    saveVersion: SAVE_VERSION,
    currencies: {
      data: 0,
      credits: 1000,
    },
    skills: {
      mining: { xp: 0, level: 1 },
      compression: { xp: 0, level: 1 },
      refining: { xp: 0, level: 1 },
      manufacturing: { xp: 0, level: 1 },
      trading: { xp: 0, level: 1 },
      exploration: { xp: 0, level: 1 },
    },
    currentSystemId: 'anchor-point',
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
    isCargoFull: (state) =>
      getCargoUsed(state.ship.cargo) >= state.ship.stats.maxCargo,
  },

  actions: {
    tick(deltaMs: number) {
      if (deltaMs > 0) {
        processMining(this.$state, deltaMs)
      }
      this.lastActiveTimestamp = Date.now()
    },

    catchUpFromLastActive() {
      const now = Date.now()
      if (this.lastActiveTimestamp <= 0) {
        this.lastActiveTimestamp = now
        return
      }

      const deltaMs = now - this.lastActiveTimestamp
      if (deltaMs > 0) {
        processMining(this.$state, deltaMs)
      }
      this.lastActiveTimestamp = now
    },

    startMining(resourceId: ResourceId): boolean {
      if (getCargoUsed(this.ship.cargo) >= this.ship.stats.maxCargo) {
        return false
      }

      this.status = 'MINING'
      this.mining.targetResourceId = resourceId
      this.mining.cycleStartTime = 0
      this.mining.cycleDuration = 2000
      return true
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

    addXp(skillId: SkillId, amount: number) {
      this.skills[skillId].xp += amount
      this.skills[skillId].level = getLevelFromXp(this.skills[skillId].xp)
    },

    changeSystem(systemId: SystemId): boolean {
      if (this.status !== 'IDLE') return false
      
      const sys = SYSTEMS[systemId]
      if (this.skills.mining.level < sys.miningUnlockLevel) return false
      
      this.currentSystemId = systemId
      return true
    },

    sellResource(resourceId: ResourceId, amount: number): boolean {
      return sellResource(this.$state, resourceId, amount)
    },

    sellAllCargo(): number {
      return sellAllCargo(this.$state)
    },

    markCheckpoint() {
      this.lastSaveTimestamp = Date.now()
      this.$persist()
    },

    hardReset() {
      // Overwrite in-memory state so any auto-saves before reload contain fresh data
      this.$state = createInitialState()
      this.$persist() // Explicitly flush the wiped state to local storage
      window.location.reload()
    },
  },

  persist: {
    key: 'star-vein-idle-player',
    pick: [
      'saveVersion',
      'currencies',
      'skills',
      'currentSystemId',
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
