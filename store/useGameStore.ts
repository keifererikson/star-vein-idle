import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { RESOURCES, SYSTEMS, ResourceId, SystemId } from '@/lib/constants';

interface ShipModule {
  id: string;
  type: 'LASER' | 'CARGO_HOLD' | 'ENGINE';
  level: number;
  statValue: number;
}

interface Ship {
  name: string;
  hullType: 'FRIGATE';
  stats: {
    maxSlots: number;
    maxCargo: number;
    baseWarpSpeed: number;
  };
  modules: ShipModule[];
  cargo: Record<string, number>;
  cargoUsed: number;
}

interface GameState {
  currencies: {
    data: number;
    credits: number;
  };
  skills: {
    miningLevel: number;
  };
  lastSaveTime: number;
  ship: Ship;
  status: 'IDLE' | 'MINING';
  mining: {
    targetResourceId: ResourceId | null;
    cycleStartTime: number;
    cycleDuration: number;
  };
  actions: {
    tick: (now: number) => void;
    startMining: (resourceId: ResourceId) => void;
    stopMining: () => void;
    sellCargo: () => void;

    reset: () => void;
    exportSave: () => string;
    importSave: (data: string) => boolean;
  };
}

export const useGameState = create<GameState>()(
  persist(
    immer((set, get) => ({
      currencies: {
        data: 0,
        credits: 1000,
      },
      skills: {
        miningLevel: 1,
      },
      lastSaveTime: Date.now(),
      ship: {
        name: 'SS Venture',
        hullType: 'FRIGATE',
        stats: {
          maxSlots: 4,
          maxCargo: 200,
          baseWarpSpeed: 100,
        },
        modules: [],
        cargo: {},
        cargoUsed: 0,
      },
      status: 'IDLE',
      mining: {
        targetResourceId: null,
        cycleStartTime: 0,
        cycleDuration: 0,
      },
      actions: {
        tick: () => {},
        startMining: () => {},
        stopMining: () => {},
        sellCargo: () => {},

        reset: () => {},
        exportSave: () => '',
        importSave: () => false,
      },
    })),
    {
      name: 'star-vein-idle-game-state',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
