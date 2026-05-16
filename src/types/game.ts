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
  cargoUsed: number
}

export type GameStatus = 'IDLE' | 'MINING'

export interface MiningState {
  targetResourceId: ResourceId | null
  cycleStartTime: number
  cycleDuration: number
}

export interface PlayerState {
  currencies: {
    data: number
    credits: number
  }
  skills: Record<string, number>
  lastTickTimestamp: number
  lastSaveTimestamp: number
  ship: Ship
  status: GameStatus
  mining: MiningState
}
