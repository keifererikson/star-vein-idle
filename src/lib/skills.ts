/**
 * Calculates the required XP for a given level.
 * Uses a basic exponential curve: xp = (level - 1)^2 * 100
 */
export function getXpForLevel(level: number): number {
  if (level <= 1) return 0
  return Math.pow(level - 1, 2) * 100
}

/**
 * Calculates the current level based on total XP.
 */
export function getLevelFromXp(xp: number): number {
  if (xp < 0) return 1
  return Math.floor(Math.sqrt(xp / 100)) + 1
}
