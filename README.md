# Star Vein Idle

An idle space-mining game — early work in progress.

Built with **Vue 3**, **Vite**, **Pinia**, and **TypeScript**. Styling uses **Tailwind CSS** (with DaisyUI for now). Icons come from **lucide-vue-next**.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

Other useful commands:

```bash
npm run build    # production build
npm run preview  # preview the build
npm run lint
```

## Project layout (rough)

```
src/
├── components/   # UI building blocks
├── views/        # Main screen panels
├── layouts/      # App shell (sidebar, header)
├── stores/       # Game state
├── systems/      # Game logic
└── lib/          # Shared constants, config
```

## Notes

This is a client-only SPA — no server rendering. The sidebar switches between section views using Vue’s dynamic `<component :is="...">` rather than a router (for now).

Game state lives in Pinia and saves to `localStorage`. A simple tick runs once per second to drive mining and other systems over time.

Lots still to build: industry, market, fitting, more resources, balance, polish, etc. Structure and patterns may change as the project grows.
