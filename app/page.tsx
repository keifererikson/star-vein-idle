'use client';

import { useGameState } from '@/store/useGameState';

export default function OverviewPage() {
  const state = useGameState();

  return (
    <div className="p-4">
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
          <p>Cycle Duration: {state.mining.cycleDuration}ms</p>
        </div>
      </div>
      {/* Add buttons for actions later, e.g., <button onClick={() => state.actions.reset()}>Reset</button> */}
    </div>
  );
}
