<script setup lang="ts">
import { computed, ref } from 'vue'
import { Menu, Coins, Package } from 'lucide-vue-next'

import ActionButton from '@/components/Action/ActionButton.vue'
import GameLogo from '@/components/Content/GameLogo.vue'
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
          <div class="flex items-center gap-1.5 text-slate-400">
            <Package class="size-4" />
            <span class="tick-number">{{ player.cargoSummary }}</span>
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
          <ActionButton
            v-for="section in SECTIONS"
            :key="section.id"
            variant="nav"
            size="sm"
            block
            :label="section.label"
            :icon="section.icon"
            :active="activeSectionId === section.id"
            @click="selectSection(section.id)"
          />
        </nav>
      </aside>
    </div>
  </div>
</template>
