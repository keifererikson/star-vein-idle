import type { ResourceId } from '@/lib/constants'

export function getCargoUsed(
  cargo: Partial<Record<ResourceId, number>>,
): number {
  return Object.values(cargo).reduce((sum, amount) => sum + (amount ?? 0), 0)
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
