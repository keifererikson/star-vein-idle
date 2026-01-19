'use client';

import { useGameLoop } from '@/hooks/useGameLoop';

export default function GameManager() {
  useGameLoop();
  return null;
}
