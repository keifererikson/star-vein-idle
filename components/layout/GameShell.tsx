'use client';

import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { APP_ROUTES } from '@/lib/navigation';
import { HamburgerIcon } from '@/components/icons/HamburgerIcon';

export default function GameShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const activeRoute = Object.values(APP_ROUTES).find(
    (r) => r.path === pathname,
  );
  const pageTitle = activeRoute ? activeRoute.name : 'Star Vein Idle';
  const pageIcon = activeRoute?.icon as React.ReactElement | null;

  return (
    <div className="drawer md:drawer-open">
      <input id="main-nav-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <div className="navbar bg-base-300 w-full z-10 shadow-md">
          <div className="navbar-start">
            <label
              htmlFor="main-nav-toggle"
              className="btn btn-square btn-ghost md:hidden"
            >
              <HamburgerIcon className="w-6 h-6" />
            </label>
          </div>
          <div className="navbar-center">
            <div className="flex text-2xl font-header font-bold items-center gap-2 mx-auto">
              {pageIcon && isValidElement(pageIcon)
                ? cloneElement(
                    pageIcon as React.ReactElement<{ className?: string }>,
                    { className: 'w-6 h-6' },
                  )
                : null}
              {pageTitle}
            </div>
          </div>
          <div className="navbar-end">
            {/* Placeholder spot for something in the future */}
          </div>
        </div>

        <main className="flex-1 p-4">{children}</main>
      </div>
      <div className="drawer-side z-20">
        <label
          htmlFor="main-nav-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-60 p-4 border-r border-base-300">
          <li className="menu-title text-primary text-2xl font-display content w-fit">
            <span>
              STAR <span className="text-white">VEIN</span>
            </span>
            <div className="flex justify-between text-gray-600 text-sm -mt-2">
              <span>I</span>
              <span>D</span>
              <span>L</span>
              <span>E</span>
            </div>
          </li>
          <li className="mt-4">
            <Link className="font-header" href={APP_ROUTES.DASHBOARD.path}>
              {APP_ROUTES.DASHBOARD.icon}
              {APP_ROUTES.DASHBOARD.name}
            </Link>
          </li>
          <li className="menu-title text-accent text-lg font-header">
            Operations
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.MINING.path}>
              {APP_ROUTES.MINING.icon}
              {APP_ROUTES.MINING.name}
            </Link>
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.NAVIGATION.path}>
              {APP_ROUTES.NAVIGATION.icon}
              {APP_ROUTES.NAVIGATION.name}
            </Link>
          </li>

          <li className="menu-title text-accent text-lg font-header mt-4">
            Ship Management
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.FITTING.path}>
              {APP_ROUTES.FITTING.icon}
              {APP_ROUTES.FITTING.name}
            </Link>
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.CARGO_HOLD.path}>
              {APP_ROUTES.CARGO_HOLD.icon}
              {APP_ROUTES.CARGO_HOLD.name}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
