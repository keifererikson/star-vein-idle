import { WritableDraft } from 'immer';
import { GameState } from '@/store/useGameState';

export function processMining(
  draft: WritableDraft<GameState>,
  deltaMs: number,
) {
  const { status, mining, ship, skills } = draft;

  if (status !== 'MINING' || !mining.targetResourceId) return;

  mining.cycleStartTime += deltaMs;

  if (mining.cycleStartTime >= mining.cycleDuration) {
    const miningLevel = skills.miningLevel || 1;
    const amountMined = 10 * miningLevel;

    if (ship.cargoUsed + amountMined <= ship.stats.maxCargo) {
      if (!ship.cargo[mining.targetResourceId]) {
        ship.cargo[mining.targetResourceId] = 0;
      }
      ship.cargo[mining.targetResourceId]! += amountMined;
      ship.cargoUsed += amountMined;

      mining.cycleStartTime %= mining.cycleDuration;
    } else {
      draft.status = 'IDLE';
      mining.targetResourceId = null;
      mining.cycleStartTime = 0;
    }
  }
}
