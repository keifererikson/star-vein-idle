<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import ActionButton from '@/components/Action/ActionButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import ProgressGauge from '@/components/Feedback/ProgressGauge.vue'
import { SYSTEMS, type SystemId, type ResourceId } from '@/lib/constants'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const { mining, status, isCargoFull, currentSystemId, skills } = storeToRefs(player)

const availableSystems = computed(() => {
  return Object.values(SYSTEMS).filter(s => skills.value.miningLevel >= s.miningUnlockLevel)
})

const currentSystem = computed(() => SYSTEMS[currentSystemId.value])

function handleSystemChange(sysId: SystemId) {
  if (player.status === 'MINING') {
    // Cannot change system while mining
    return
  }
  player.changeSystem(sysId)
}

function handleResourceClick(resId: ResourceId) {
  if (isCargoFull.value && mining.value.targetResourceId !== resId) {
    return
  }

  if (mining.value.targetResourceId === resId && status.value === 'MINING') {
    player.stopMining()
  } else {
    player.startMining(resId)
  }
}
</script>

<template>
  <TerminalBox
    title="Extraction"
    subtitle="Mining cycles and resource yield"
  >
    <!-- System Tabs -->
    <div class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="sys in availableSystems"
        :key="sys.id"
        class="px-4 py-2 text-sm font-mono rounded transition-colors"
        :class="[
          currentSystemId === sys.id 
            ? 'bg-emerald-900 border border-emerald-500 text-emerald-100' 
            : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800',
          status === 'MINING' && currentSystemId !== sys.id ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        ]"
        :disabled="status === 'MINING' && currentSystemId !== sys.id"
        @click="handleSystemChange(sys.id)"
      >
        {{ sys.name }}
      </button>
    </div>

    <!-- Resource Cards -->
    <div class="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div 
        v-for="res in currentSystem.resources" 
        :key="res.id"
        class="border rounded p-4 flex flex-col cursor-pointer transition-colors"
        :class="[
          mining.targetResourceId === res.id && status === 'MINING'
            ? 'bg-slate-800 border-emerald-500' 
            : 'bg-slate-900 border-slate-700 hover:bg-slate-800 hover:border-slate-500',
          isCargoFull && mining.targetResourceId !== res.id ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        @click="handleResourceClick(res.id)"
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="font-mono text-sm font-bold" :class="mining.targetResourceId === res.id && status === 'MINING' ? 'text-emerald-400' : 'text-slate-200'">
              {{ res.name }}
            </h3>
            <p class="text-xs text-slate-400 font-mono mt-1">Value: {{ res.baseValue }} CR</p>
          </div>
          <span 
            v-if="mining.targetResourceId === res.id && status === 'MINING'" 
            class="text-xs font-mono font-bold text-emerald-400 animate-pulse px-2 py-1 bg-emerald-900/50 rounded"
          >
            MINING
          </span>
        </div>

        <div class="mt-auto">
          <ProgressGauge
            v-if="mining.targetResourceId === res.id && status === 'MINING' && mining.cycleDuration > 0"
            :value="mining.cycleStartTime"
            :max="mining.cycleDuration"
            class="h-2"
          />
          <div v-else class="h-2 bg-slate-950 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Footer Controls & Stats -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800 pt-4">
      <p class="font-mono text-sm text-slate-400">
        Mining Level: <span class="text-emerald-400">{{ skills.miningLevel }}</span> 
        <span class="text-xs ml-2 text-slate-500">({{ skills.miningXp }} XP)</span>
      </p>

      <div class="flex flex-wrap gap-2">
        <ActionButton
          variant="danger"
          label="Stop All"
          :disabled="status === 'IDLE'"
          @click="player.stopMining()"
        />
        <ActionButton
          variant="ghost"
          label="Jettison Cargo"
          @click="player.jettison()"
        />
      </div>
    </div>
  </TerminalBox>
</template>
