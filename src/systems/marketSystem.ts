import { removeFromCargo } from '@/lib/cargo'
import { RESOURCES, type ResourceId } from '@/lib/constants'
import { useNotificationStore } from '@/stores/useNotificationStore'
import type { PlayerState } from '@/types/game'

/**
 * Sells a specific amount of a resource from the cargo for credits.
 */
export function sellResource(state: PlayerState, resourceId: ResourceId, amount: number): boolean {
  const currentAmt = state.ship.cargo[resourceId]
  if (currentAmt === undefined || currentAmt < amount || amount <= 0) {
    return false
  }

  const value = RESOURCES[resourceId].baseValue * amount
  
  const removed = removeFromCargo(state.ship.cargo, resourceId, amount)
  if (removed > 0) {
    state.currencies.credits += value
    const notifications = useNotificationStore()
    notifications.addToast(`+${value.toLocaleString()} CR`, 'success')
    return true
  }
  
  return false
}

/**
 * Sells all resources in the cargo hold.
 * Returns the total credits gained.
 */
export function sellAllCargo(state: PlayerState): number {
  let totalCreditsGained = 0

  for (const [resId, amount] of Object.entries(state.ship.cargo)) {
    if (amount !== undefined && amount > 0) {
      const resourceId = resId as ResourceId
      const value = RESOURCES[resourceId].baseValue * amount
      totalCreditsGained += value
    }
  }

  // Clear cargo if items were sold
  if (totalCreditsGained > 0) {
    state.ship.cargo = {}
    state.currencies.credits += totalCreditsGained
    const notifications = useNotificationStore()
    notifications.addToast(`+${totalCreditsGained.toLocaleString()} CR`, 'success')
  }

  return totalCreditsGained
}
