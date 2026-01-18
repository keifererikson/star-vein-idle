'use client';

import React, { cloneElement, isValidElement, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { APP_ROUTES, SIDEBAR_STRUCTURE } from '@/lib/navigation';
import { SidebarNavItem } from './SidebarNavItem';
import { GameLogo } from './GameLogo';
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
        <div className="navbar bg-base-300 z-10 shadow-md m-3 w-auto rounded-box">
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

        <main className="flex-1 m-3">{children}</main>
      </div>
      <div className="drawer-side z-20 border-r border-primary">
        <label
          htmlFor="main-nav-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-48 p-3 font-header">
          <li className="menu-title w-fit p-1">
            <GameLogo />
          </li>

          {SIDEBAR_STRUCTURE.map(({ section, routes }) => (
            <React.Fragment key={section}>
              <li className="menu-title text-accent text-lg mt-3">{section}</li>
              {routes?.map((route) => (
                <SidebarNavItem
                  key={route.path}
                  href={route.path}
                  icon={route.icon}
                  name={route.name}
                />
              ))}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
