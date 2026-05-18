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

/**
 * Calculates the percentage (0-100) of progress towards the next level.
 */
export function getSkillProgress(xp: number, level: number): number {
  const currentLevelXp = getXpForLevel(level)
  const nextLevelXp = getXpForLevel(level + 1)
  const xpIntoLevel = xp - currentLevelXp
  const xpRequired = nextLevelXp - currentLevelXp
  
  if (xpRequired <= 0) return 0
  return Math.min(100, Math.max(0, (xpIntoLevel / xpRequired) * 100))
}
