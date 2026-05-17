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
