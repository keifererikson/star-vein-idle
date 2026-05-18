<script setup lang="ts">
import { computed, ref } from 'vue'
import { Menu, Coins, Package } from 'lucide-vue-next'

import ActionButton from '@/components/Action/ActionButton.vue'
import GameLogo from '@/components/Content/GameLogo.vue'
import { getSkillProgress } from '@/lib/skills'
import {
  DEFAULT_SECTION_ID,
  SECTIONS,
  type SectionId,
} from '@/lib/sections'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const activeSectionId = ref<SectionId>(DEFAULT_SECTION_ID)
const sidebarOpen = ref(false)

const activeSection = computed(() =>
  SECTIONS.find((section) => section.id === activeSectionId.value) ??
  SECTIONS[0],
)

function selectSection(id: SectionId) {
  activeSectionId.value = id
  sidebarOpen.value = false
}
</script>

<template>
  <div class="drawer md:drawer-open">
    <input
      id="main-nav-toggle"
      v-model="sidebarOpen"
      type="checkbox"
      class="drawer-toggle"
    />

    <div class="drawer-content flex h-screen flex-col">
      <header
        class="navbar z-10 mx-3 mt-3 w-auto shrink-0 rounded-lg border border-space-700/80 bg-space-800/80 p-3 shadow-lg"
      >
        <div class="navbar-start">
          <label
            for="main-nav-toggle"
            class="btn btn-ghost btn-square md:hidden"
            aria-label="Toggle navigation"
          >
            <Menu class="size-5" />
          </label>
        </div>

        <div class="navbar-center">
          <div class="flex items-center gap-2 font-mono text-xl font-semibold text-slate-200">
            <component
              :is="activeSection.icon"
              class="size-5 text-plasma-400"
              aria-hidden="true"
            />
            <span>{{ activeSection.label }}</span>
          </div>
        </div>

        <div class="navbar-end flex flex-col items-end gap-1 font-mono text-sm">
          <div class="flex items-center gap-1.5 text-plasma-400">
            <Coins class="size-4" />
            <span class="tick-number">{{ player.creditsFormatted }} CR</span>
          </div>
          <div class="flex flex-col w-32">
            <div class="flex items-center justify-end gap-1.5 text-slate-400 mb-1">
              <Package class="size-4" />
              <span class="tick-number">{{ player.cargoSummary }}</span>
            </div>
            <div class="h-1 w-full bg-space-950 rounded overflow-hidden relative">
              <div 
                class="absolute top-0 left-0 h-full transition-all duration-300"
                :class="player.isCargoFull ? 'bg-red-500' : 'bg-amber-500'"
                :style="{ width: `${Math.min(100, (player.cargoUsed / player.ship.stats.maxCargo) * 100)}%` }"
              ></div>
            </div>
          </div>
        </div>
      </header>

      <main class="m-3 min-h-0 flex-1 overflow-y-auto">
        <component :is="activeSection.view" />
      </main>
    </div>

    <div class="drawer-side z-20">
      <label
        for="main-nav-toggle"
        class="drawer-overlay"
        aria-label="Close navigation"
      />

      <aside
        class="flex min-h-full w-56 flex-col gap-2 border-r border-space-700/80 bg-space-800/95 p-3"
      >
        <GameLogo class="mb-6 mt-2 mx-auto" />

        <nav class="flex flex-col gap-1" aria-label="Main sections">
          <template v-for="section in SECTIONS" :key="section.id">
            <ActionButton
              variant="nav"
              size="sm"
              block
              :label="section.label"
              :icon="section.icon"
              :active="activeSectionId === section.id"
              @click="selectSection(section.id)"
            />

            <!-- Sub-panel for Extraction -->
            <div 
              v-if="section.id === 'extraction'"
              class="ml-3 mb-1 flex flex-col gap-1 border-l border-space-600"
            >
              <button
                class="relative flex flex-col text-left pl-3 pr-2 py-2 bg-space-800/30 hover:bg-space-700/50 transition-colors rounded-r cursor-pointer overflow-hidden group"
                @click="selectSection(section.id)"
              >
                <div 
                  class="flex justify-between items-center text-xs font-mono w-full transition-colors"
                  :class="player.status === 'MINING' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'"
                >
                  <span class="flex items-center gap-1.5">
                    <span 
                      v-if="player.status === 'MINING'" 
                      class="size-1.5 rounded-full bg-emerald-400 animate-pulse"
                    ></span>
                    Ore Mining
                  </span>
                  <span class="text-emerald-400">Lv.{{ player.skills.mining.level }}</span>
                </div>
                <!-- Embedded bottom progress bar -->
                <div class="absolute bottom-0 left-0 h-0.5 w-full bg-space-950/50">
                  <div 
                    class="h-full bg-emerald-500 transition-all duration-300"
                    :style="{ width: `${getSkillProgress(player.skills.mining.xp, player.skills.mining.level)}%` }"
                  ></div>
                </div>
              </button>
            </div>
          </template>
        </nav>
      </aside>
    </div>
  </div>
</template>
