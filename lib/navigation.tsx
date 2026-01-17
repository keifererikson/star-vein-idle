import { ReactNode } from 'react';
import { DashboardIcon } from '@/components/icons/DashboardIcon';
import { MiningIcon } from '@/components/icons/MiningIcon';
import { NavigationIcon } from '@/components/icons/NavigationIcon';
import { FittingIcon } from '@/components/icons/FittingIcon';
import { CargoHoldIcon } from '@/components/icons/CargoHoldIcon';
import path from 'path';

export const APP_ROUTES = {
  DASHBOARD: {
    key: 'dashboard',
    name: 'Dashboard',
    path: '/',
    section: 'Operations',
    icon: <DashboardIcon />,
  },
  MINING: {
    key: 'mining',
    name: 'Mining',
    path: '/mining',
    section: 'Operations',
    icon: <MiningIcon />,
  },
  NAVIGATION: {
    key: 'navigation',
    name: 'Navigation',
    path: '/navigation',
    section: 'Operations',
    icon: <NavigationIcon />,
  },
  FITTING: {
    key: 'fitting',
    name: 'Fitting',
    path: '/fitting',
    section: 'Ship Management',
    icon: <FittingIcon />,
  },
  CARGO_HOLD: {
    key: 'cargo_hold',
    name: 'Cargo Hold',
    path: '/cargo-hold',
    section: 'Ship Management',
    icon: <CargoHoldIcon />,
  },
};
