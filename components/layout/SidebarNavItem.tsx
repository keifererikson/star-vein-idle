'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface SidebarNavItemProps {
  href: string;
  icon: ReactNode;
  name: string;
}

export const SidebarNavItem = ({ href, icon, name }: SidebarNavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <li>
      <Link className={isActive ? 'menu-active' : ''} href={href}>
        {icon}
        {name}
        {/* <span className="badge badge-sm">Lv. 01</span> */}
      </Link>
    </li>
  );
};
