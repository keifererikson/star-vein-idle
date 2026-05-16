import type { PlayerState } from '@/types/game'

const BASE_MINING_YIELD = 10
const YIELD_PER_SKILL_LEVEL = 0.05

export function processMining(state: PlayerState, deltaMs: number): void {
  const { status, mining, ship, skills } = state

  if (status !== 'MINING' || !mining.targetResourceId) return

  mining.cycleStartTime += deltaMs

  if (mining.cycleStartTime < mining.cycleDuration) return

  let moduleYield = 0

  for (const mod of ship.modules) {
    if (mod.type === 'LASER') {
      moduleYield += mod.statValue
    }
  }

  const skillMultiplier =
    1 + (skills.miningLevel ?? 0) * YIELD_PER_SKILL_LEVEL
  const rawYield = (moduleYield || BASE_MINING_YIELD) * skillMultiplier
  const spaceRemaining = ship.stats.maxCargo - ship.cargoUsed
  const actualAdd = Math.min(rawYield, spaceRemaining)
  const resourceId = mining.targetResourceId

  ship.cargo[resourceId] = (ship.cargo[resourceId] ?? 0) + actualAdd
  ship.cargoUsed += actualAdd

  if (actualAdd < rawYield || ship.cargoUsed >= ship.stats.maxCargo) {
    state.status = 'IDLE'
    mining.targetResourceId = null
    mining.cycleStartTime = 0
  } else {
    mining.cycleStartTime %= mining.cycleDuration
  }
}
