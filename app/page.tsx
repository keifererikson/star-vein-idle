'use client';

import { useGameState } from '@/store/useGameState';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function OverviewPage() {
  const state = useGameState();

  return (
    <div className="p-3 card bg-base-200">
      <h1 className="text-2xl font-bold">Overview (Debug)</h1>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <h2>Currencies</h2>
          <p>Credits: {state.currencies.credits}</p>
          <p>Data: {state.currencies.data}</p>
        </div>
        <div>
          <h2>Skills</h2>
          <p>Mining Level: {state.skills.miningLevel}</p>
        </div>
        <div>
          <h2>Ship</h2>
          <p>Name: {state.ship.name}</p>
          <p>Status: {state.status}</p>
          <p>
            Cargo Used: {state.ship.cargoUsed} / {state.ship.stats.maxCargo}
          </p>
          <p>Cargo: {JSON.stringify(state.ship.cargo)}</p>
        </div>
        <div>
          <h2>Mining</h2>
          <p>Target: {state.mining.targetResourceId || 'None'}</p>
          <ProgressBar
            start={state.mining.cycleStartTime}
            duration={state.mining.cycleDuration}
            className=""
          />
          <p>Cycle Duration: {state.mining.cycleDuration}ms</p>
          <button
            onClick={() => state.actions.startMining('iron')}
            className="btn btn-success mr-2"
          >
            Start Mining
          </button>
          <button
            onClick={() => state.actions.stopMining()}
            className="btn btn-error"
          >
            Stop Mining
          </button>
          <button
            onClick={() => state.actions.jettison()}
            className="btn btn-warning ml-2"
          >
            Jettison
          </button>
          <h2>Timestamps</h2>
          <p>Last Tick: {state.lastTickTimestamp / 1000}</p>
          <p>Last Save: {new Date(state.lastSaveTimestamp).toLocaleString()}</p>
          <button
            onClick={() => (state.lastSaveTimestamp = Date.now())}
            className="btn btn-primary"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
