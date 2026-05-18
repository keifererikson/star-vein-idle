import { addToCargo, getCargoUsed } from '@/lib/cargo'
import { getLevelFromXp } from '@/lib/skills'
import type { PlayerState } from '@/types/game'

const BASE_MINING_YIELD = 10
const YIELD_PER_SKILL_LEVEL = 0.05

/** Laser modules replace base yield; sum of lasers, or base if none equipped. */
function computeMiningYield(state: PlayerState): number {
  let moduleYield = 0

  for (const mod of state.ship.modules) {
    if (mod.type === 'LASER') {
      moduleYield += mod.statValue
    }
  }

  const skillMultiplier =
    1 + (state.skills.mining.level ?? 0) * YIELD_PER_SKILL_LEVEL

  return (moduleYield || BASE_MINING_YIELD) * skillMultiplier
}

function completeMiningCycle(state: PlayerState): boolean {
  const { mining, ship } = state
  const resourceId = mining.targetResourceId

  if (!resourceId) return true

  const rawYield = computeMiningYield(state)
  const cargoUsed = getCargoUsed(ship.cargo)
  const spaceRemaining = ship.stats.maxCargo - cargoUsed
  const actualAdd = Math.min(rawYield, spaceRemaining)

  addToCargo(ship.cargo, resourceId, actualAdd)

  if (actualAdd > 0) {
    state.skills.mining.xp += 10
    state.skills.mining.level = getLevelFromXp(state.skills.mining.xp)
  }

  const full = cargoUsed + actualAdd >= ship.stats.maxCargo
  const partialYield = actualAdd < rawYield

  if (partialYield || full) {
    state.status = 'IDLE'
    mining.targetResourceId = null
    mining.cycleStartTime = 0
    mining.cycleDuration = 0
    return true
  }

  return false
}

export function processMining(state: PlayerState, deltaMs: number): void {
  const { status, mining } = state

  if (status !== 'MINING' || !mining.targetResourceId) return

  if (mining.cycleDuration <= 0) {
    state.status = 'IDLE'
    mining.targetResourceId = null
    mining.cycleStartTime = 0
    mining.cycleDuration = 0
    return
  }

  mining.cycleStartTime += deltaMs

  while (mining.cycleStartTime >= mining.cycleDuration) {
    if (state.status !== 'MINING' || !mining.targetResourceId) break

    mining.cycleStartTime -= mining.cycleDuration

    if (completeMiningCycle(state)) break
  }
}
