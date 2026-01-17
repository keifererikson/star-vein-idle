import Link from 'next/link';
import { APP_ROUTES } from '@/lib/navigation';
import { HamburgerIcon } from '@/components/icons/HamburgerIcon';


export default function Home() {
  return (
    <div className="drawer md:drawer-open">
      <input id="main-nav-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <div className="navbar bg-base-300 w-full z-10 shadow-md">
          <div className="flex items-center gap-2">
            <label htmlFor="main-nav-toggle" className="btn btn-square btn-ghost md:hidden">
              <HamburgerIcon className="w-6 h-6" />
            </label>
            <span className="h-full text-2xl font-bold font-display">PAGE NAME HERE</span>
          </div>
        </div>
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Welcome to Star Vein Idle</h1>
        </main>
      </div>
      <div className="drawer-side z-20">
        <label htmlFor="main-nav-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-60 p-4 border-r border-base-300">
          <li className="menu-title text-primary text-lg font-display">STAR VEIN IDLE</li>
          <li className="menu-title text-accent text-lg font-header mt-4">Operations</li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.MINING.path}>
              { APP_ROUTES.MINING.icon }
              { APP_ROUTES.MINING.name }
            </Link>
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.NAVIGATION.path}>
              { APP_ROUTES.NAVIGATION.icon }
              { APP_ROUTES.NAVIGATION.name }
            </Link>
          </li>

          <li className="menu-title text-accent text-lg font-header mt-4">Ship Management</li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.FITTING.path}>
              { APP_ROUTES.FITTING.icon }
              { APP_ROUTES.FITTING.name }
            </Link>
          </li>
          <li className="">
            <Link className="font-header" href={APP_ROUTES.CARGO_HOLD.path}>
              { APP_ROUTES.CARGO_HOLD.icon }
              { APP_ROUTES.CARGO_HOLD.name }
            </Link>
          </li>
        </ul>
      </div>

    </div>
  );
}
