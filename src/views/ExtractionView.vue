<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Clock, Coins, Lock, Zap } from 'lucide-vue-next'

import ActionButton from '@/components/Action/ActionButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import ProgressGauge from '@/components/Feedback/ProgressGauge.vue'
import { SYSTEMS, type SystemId, type ResourceId } from '@/lib/constants'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const { mining, status, isCargoFull, currentSystemId, skills } = storeToRefs(player)

const allSystems = computed(() => {
  return Object.values(SYSTEMS)
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
        v-for="sys in allSystems"
        :key="sys.id"
        class="px-4 py-2 text-sm font-mono rounded transition-colors flex items-center gap-1.5"
        :class="[
          currentSystemId === sys.id 
            ? 'bg-emerald-900 border border-emerald-500 text-emerald-100' 
            : skills.mining.level < sys.miningUnlockLevel
              ? 'bg-space-900 border border-space-700 text-slate-500 cursor-not-allowed'
              : 'bg-slate-900 border border-slate-700 text-slate-400 hover:bg-slate-800 cursor-pointer',
          status === 'MINING' && currentSystemId !== sys.id && skills.mining.level >= sys.miningUnlockLevel ? 'opacity-50 cursor-not-allowed' : ''
        ]"
        :disabled="(status === 'MINING' && currentSystemId !== sys.id) || skills.mining.level < sys.miningUnlockLevel"
        @click="handleSystemChange(sys.id)"
      >
        <Lock v-if="skills.mining.level < sys.miningUnlockLevel" class="size-3 text-slate-600" />
        {{ sys.name }}
        <span v-if="skills.mining.level < sys.miningUnlockLevel" class="text-xs text-slate-600 ml-1">(Lv.{{ sys.miningUnlockLevel }})</span>
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
        <div class="flex items-start justify-between mb-4 gap-4">
          <h3 class="font-mono text-sm font-bold truncate" :class="mining.targetResourceId === res.id && status === 'MINING' ? 'text-emerald-400' : 'text-slate-200'">
            {{ res.name }}
          </h3>
          
          <div class="flex flex-wrap justify-end gap-x-3 gap-y-1">
            <div class="flex items-center gap-1 text-slate-400 font-mono text-xs">
              <span class="text-slate-300">{{ res.baseValue }}</span>
              <Coins class="w-3 h-3 text-slate-500" />
            </div>
            <div class="flex items-center gap-1 text-slate-400 font-mono text-xs">
              <span class="text-emerald-400">{{ res.baseXp }}</span>
              <Zap class="w-3 h-3 text-emerald-600" />
            </div>
            <div class="flex items-center gap-1 text-slate-400 font-mono text-xs">
              <span class="text-slate-300">2.0s</span>
              <Clock class="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>

        <div class="mt-auto relative">
          <ProgressGauge
            v-if="mining.targetResourceId === res.id && status === 'MINING' && mining.cycleDuration > 0"
            :value="mining.cycleStartTime"
            :max="mining.cycleDuration"
            class="h-6"
          />
          <div v-else class="h-6 bg-slate-950 rounded"></div>
          
          <div 
            v-if="mining.targetResourceId === res.id && status === 'MINING'" 
            class="absolute inset-0 flex items-center justify-center text-[10px] leading-none pb-[4px] font-mono font-bold text-slate-100 uppercase tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] pointer-events-none animate-pulse z-10"
          >
            MINING
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Controls & Stats -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-800 pt-4">
      <p class="font-mono text-sm text-slate-400">
        Mining Level: <span class="text-emerald-400">{{ skills.mining.level }}</span> 
        <span class="text-xs ml-2 text-slate-500">({{ skills.mining.xp }} XP)</span>
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
