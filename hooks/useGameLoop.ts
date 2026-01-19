import { useEffect, useRef } from 'react';
import { useGameState } from '@/store/useGameState';

export const useGameLoop = () => {
  const tick = useGameState((state) => state.actions.tick);

  const requestRef = useRef<number>(null);
  const previousTimeRef = useRef<number>(null);

  const loop = (timestamp: number) => {
    if (previousTimeRef.current !== null) {
      const deltaMs = timestamp - previousTimeRef.current;
      const safeDelta = Math.min(deltaMs, 1000);

      tick(safeDelta);
    }

    previousTimeRef.current = timestamp;
    requestRef.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(loop);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [tick]);
};
