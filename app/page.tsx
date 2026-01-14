export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="text-2xl font-display font-bold">
            STAR VEIN IDLE
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            An idle space mining game. <span className="font-mono">10,000</span> years in the future.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="btn btn-primary"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play
          </a>
          <a
            className="btn btn-soft"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Logout
          </a>
        </div>
      </main>
    </div>
  );
}
