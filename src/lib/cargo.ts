import { RESOURCES, type ResourceId } from '@/lib/constants'

export function getCargoUsed(
  cargo: Partial<Record<ResourceId, number>>,
): number {
  return Object.entries(cargo).reduce((sum, [resId, amount]) => {
    const vol = RESOURCES[resId as ResourceId].volumePerUnit
    return sum + (amount ?? 0) * vol
  }, 0)
}

export function addToCargo(
  cargo: Partial<Record<ResourceId, number>>,
  resourceId: ResourceId,
  amount: number,
): number {
  if (amount <= 0) return 0
  cargo[resourceId] = (cargo[resourceId] ?? 0) + amount
  return amount
}

export function removeFromCargo(
  cargo: Partial<Record<ResourceId, number>>,
  resourceId: ResourceId,
  amount: number,
): number {
  if (amount <= 0) return 0
  const current = cargo[resourceId] ?? 0
  const removed = Math.min(current, amount)
  
  if (removed > 0) {
    cargo[resourceId] = current - removed
    if (cargo[resourceId] === 0) {
      delete cargo[resourceId]
    }
  }
  
  return removed
}
