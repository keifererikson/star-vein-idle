import { WritableDraft } from 'immer';
import { GameState } from '@/store/useGameState';

const BASE_MINING_YIELD = 10;
const YIELD_PER_SKILL_LEVEL = 0.05;

export function processMining(
  draft: WritableDraft<GameState>,
  deltaMs: number,
) {
  const { status, mining, ship, skills } = draft;

  if (status !== 'MINING' || !mining.targetResourceId) return;

  mining.cycleStartTime += deltaMs;

  if (mining.cycleStartTime >= mining.cycleDuration) {
    if (mining.cycleStartTime >= mining.cycleDuration) {
      let moduleYield = 0;

      ship.modules.forEach((mod) => {
        if (mod.type === 'LASER') {
          moduleYield += mod.statValue;
        }
      });

      const skillMultiplier =
        1 + (skills.miningLevel || 0) * YIELD_PER_SKILL_LEVEL;
      const rawYield = (moduleYield || BASE_MINING_YIELD) * skillMultiplier;
      const spaceRemaining = ship.stats.maxCargo - ship.cargoUsed;
      const actualAdd = Math.min(rawYield, spaceRemaining);

      if (!ship.cargo[mining.targetResourceId]) {
        ship.cargo[mining.targetResourceId] = 0;
      }

      ship.cargo[mining.targetResourceId]! += actualAdd;
      ship.cargoUsed += actualAdd;

      if (actualAdd < rawYield || ship.cargoUsed >= ship.stats.maxCargo) {
        draft.status = 'IDLE';
        mining.targetResourceId = null;
        mining.cycleStartTime = 0;
      } else {
        mining.cycleStartTime %= mining.cycleDuration;
      }
    }
  }
}
