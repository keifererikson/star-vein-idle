export default function Home() {
  return (
    <div className="drawer md:drawer-open">
      <input id="main-nav-toggle" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col h-screen">
        <div className="navbar bg-base-300 w-full z-10 shadow-md">
          <div className="flex items-center gap-2">
            <label htmlFor="main-nav-toggle" className="btn btn-square btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512">
                {/* Icon from Game Icons by GameIcons - https://github.com/game-icons/icons/blob/master/license.txt */}
                <path fill="currentColor" d="M32 96v64h448V96zm0 128v64h448v-64zm0 128v64h448v-64z" />
              </svg>
            </label>
            <span className="h-full text-2xl font-bold font-display">STAR VEIN IDLE</span>
          </div>
        </div>
        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold">Welcome to Star Vein Idle</h1>
        </main>
      </div>
      <div className="drawer-side z-20">
        <label htmlFor="main-nav-toggle" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-50 p-4 border-r border-base-300">
          <li className="menu-title text-accent">Operations</li>
          <li className="">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                {/* Icon from Bitcoin Icons by Bitcoin Design Community - https://github.com/BitcoinDesign/Bitcoin-Icons/blob/main/LICENSE-MIT */}
                <path fill="currentColor" d="M12.101 2.9a.5.5 0 0 1 .378-.056l3.397.847a.5.5 0 0 1 .37.573c2.365 1.107 4.125 2.93 4.815 4.983a.5.5 0 0 1-.82.52c-1.21-1.16-2.794-2.171-4.642-2.902l-.025.1a.5.5 0 0 1-.606.364l-.485-.12l-.907 3.638a.5.5 0 0 1 .364.606l-2.298 9.218a.5.5 0 0 1-.606.364L8.61 20.43a.5.5 0 0 1-.364-.606l2.298-9.218a.5.5 0 0 1 .606-.364l.907-3.638l-.485-.121a.5.5 0 0 1-.364-.607l.025-.1c-1.974-.222-3.847-.073-5.46.383a.5.5 0 0 1-.48-.844c1.572-1.488 3.982-2.272 6.59-2.14a.5.5 0 0 1 .218-.274" />
              </svg>
              Mining
            </a>
          </li>
          <li className="">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                {/* Icon from Majesticons by Gerrit Halfmann - https://github.com/halfmage/majesticons/blob/main/LICENSE */}
                <g fill="none"><g clipPath="url(#SVGXv8lpc2Y)"><path fill="currentColor" d="m21.048 8.868l1.402-.318l-.318 1.402a8 8 0 0 1-2.145 3.89L17.5 16.328l-.015.015c1.71 1.709-.702 4.935-1.414 5.628l-1.4-2.814l-2.828-2.829L9 14.9c.722-.703 4.001-3.1 5.686-1.415l2.472-2.472a8 8 0 0 1 3.89-2.145" /><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.672 19.157l-2.829-2.829m2.829 2.829l1.4 2.814c.711-.693 3.122-3.919 1.413-5.628m-2.813 2.814l2.813-2.814m-5.642-.015l2.829-2.828l.014-.015m-2.843 2.843L9 14.9c.722-.703 4.001-3.1 5.686-1.415m2.814 2.843l-.015.015m0 0l2.502-2.501a8 8 0 0 0 2.145-3.89l.318-1.402l-1.402.318a8 8 0 0 0-3.89 2.145l-2.472 2.472m-11.272-.172c-1.339 2.117-1.85 3.806-1.192 4.465c.586.586 1.987.246 3.778-.778m7.313-13.586c2.117-1.339 3.806-1.85 4.465-1.192c.886.885-.345 3.634-2.854 6.778m-10.67 5A7.002 7.002 0 0 1 14 4.254" /></g><defs><clipPath id="SVGXv8lpc2Y"><path fill="#fff" d="M0 0h24v24H0z" /></clipPath></defs></g>
              </svg>
              Navigation
            </a>
          </li>

          <li className="menu-title text-accent mt-4">Ship Management</li>
          <li className="">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                {/* Icon from Sargam Icons by Abhimanyu Rana - https://github.com/planetabhi/sargam-icons/blob/main/LICENSE.txt  */}
                <path fill="currentColor" d="M13.5 19.862c0 .276-.092.572-.192.822a7 7 0 0 1-.372.76a11 11 0 0 1-.513.824l-.01.013l-.003.004v.001a.5.5 0 0 1-.739.091l-.08-.09l-.002-.002l-.002-.004l-.01-.013l-.034-.05l-.119-.18c-.098-.15-.229-.36-.36-.595a7 7 0 0 1-.371-.76c-.1-.25-.193-.545-.193-.82c0-.502.2-.885.549-1.116c.313-.206.68-.247.951-.247s.638.04.95.247c.35.23.55.614.55 1.115m1.805-12.125c0 1.047.693 1.975 1.619 2.836c.456.424.935.804 1.375 1.163c.42.344.839.694 1.092 1.027c.157.201.247.46.305.69c.06.245.1.516.125.777c.052.514.059 1.065.072 1.355a.88.88 0 0 1-.89.915H15.33l-.533.639a.9.9 0 0 1-.722.361H9.927a.9.9 0 0 1-.72-.361l-.534-.639H5a.88.88 0 0 1-.89-.915l.022-.594c.01-.238.024-.504.05-.761c.026-.261.064-.532.126-.777c.058-.23.147-.489.305-.69c.253-.333.67-.683 1.09-1.027c.44-.36.92-.739 1.376-1.163c.926-.861 1.618-1.79 1.618-2.836V6.59c0-1.274.425-2.504 1.017-3.426c.297-.462.645-.86 1.02-1.152c.37-.288.8-.497 1.252-.512h.034c.452.015.882.224 1.252.512c.374.291.723.69 1.02 1.152a6.5 6.5 0 0 1 1.013 3.426z" />
              </svg>
              Fitting
            </a>
          </li>
          <li className="">
            <a>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                {/* Icon from Remix Icon by Remix Design - https://github.com/Remix-Design/RemixIcon/blob/master/License */}
                <path fill="currentColor" d="M20.502 5.922L12 1L3.498 5.922L12 10.845zM2.5 7.656V17.5l8.5 4.921v-9.844zM13 22.42l8.5-4.921V7.656l-8.5 4.92z" /></svg>
              Cargo Hold
            </a>
          </li>
        </ul>
      </div>

    </div>
  );
}
