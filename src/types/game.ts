import type { ResourceId } from '@/lib/constants'

export type ShipModuleType = 'LASER' | 'CARGO_HOLD' | 'ENGINE'

export interface ShipModule {
  id: string
  type: ShipModuleType
  level: number
  statValue: number
}

export interface Ship {
  name: string
  hullType: 'FRIGATE'
  stats: {
    maxSlots: number
    maxCargo: number
    baseWarpSpeed: number
  }
  modules: ShipModule[]
  cargo: Partial<Record<ResourceId, number>>
}

export type GameStatus = 'IDLE' | 'MINING'

export interface MiningState {
  targetResourceId: ResourceId | null
  cycleStartTime: number
  cycleDuration: number
}

export interface PlayerSkills {
  miningLevel: number
}

export interface PlayerState {
  saveVersion: number
  currencies: {
    data: number
    credits: number
  }
  skills: PlayerSkills
  /** Wall-clock ms when the game last ran; drives offline catch-up. */
  lastActiveTimestamp: number
  lastSaveTimestamp: number
  ship: Ship
  status: GameStatus
  mining: MiningState
}
