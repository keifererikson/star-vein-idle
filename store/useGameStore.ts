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
  resources: {
    data: number;
    credits: number;
  };
  lastSaveTime: number;
  ship: Ship;
  status: 'IDLE' | 'MINING';
  mining: {
    targetResourceId: ResourceId | null;
    cycleStartTime: number;
    cycleDuration: number;
  };
  unlocks: {
    scannedSystems: SystemId[];
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
