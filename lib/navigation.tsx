import { ReactNode } from 'react';
import { OverviewIcon } from '@/components/icons/OverviewIcon';
import { MiningIcon } from '@/components/icons/MiningIcon';
import { NavigationIcon } from '@/components/icons/NavigationIcon';
import { FittingIcon } from '@/components/icons/FittingIcon';
import { CargoHoldIcon } from '@/components/icons/CargoHoldIcon';
import path from 'path';

export const APP_ROUTES = {
  OVERVIEW: {
    key: 'overview',
    name: 'Overview',
    path: '/',
    section: 'Operations',
    icon: <OverviewIcon />,
  },
  FITTING: {
    key: 'fitting',
    name: 'Fitting',
    path: '/fitting',
    section: 'Operations',
    icon: <FittingIcon />,
  },
  MINING: {
    key: 'mining',
    name: 'Mining',
    path: '/mining',
    section: 'Extraction',
    icon: <MiningIcon />,
  },
  MARKET: {
    key: 'market',
    name: 'Market',
    path: '/market',
    section: 'Management',
    icon: <NavigationIcon />,
  },
  CARGO_HOLD: {
    key: 'cargo_hold',
    name: 'Cargo Hold',
    path: '/cargo-hold',
    section: 'Management',
    icon: <CargoHoldIcon />,
  },
};

export const SIDEBAR_STRUCTURE = [
  {
    section: 'Operations',
    routes: [APP_ROUTES.OVERVIEW, APP_ROUTES.FITTING],
  },
  {
    section: 'Extraction',
    routes: [APP_ROUTES.MINING],
  },
  {
    section: 'Management',
    routes: [APP_ROUTES.MARKET, APP_ROUTES.CARGO_HOLD],
  },
];
