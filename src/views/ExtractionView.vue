<script setup lang="ts">
import { storeToRefs } from 'pinia'

import SciFiButton from '@/components/Action/SciFiButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import ProgressGauge from '@/components/Feedback/ProgressGauge.vue'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const { mining, status, isCargoFull } = storeToRefs(player)

</script>

<template>
  <TerminalBox
    title="Extraction"
    subtitle="Mining cycles and resource yield"
  >
    <p class="mb-2 font-mono text-sm">
      Target: {{ mining.targetResourceId ?? 'None' }}
    </p>

    <ProgressGauge
      v-if="status === 'MINING' && mining.cycleDuration > 0"
      :value="mining.cycleStartTime"
      :max="mining.cycleDuration"
    />

    <p class="mt-2 font-mono text-xs text-slate-500">
      Cycle: {{ mining.cycleDuration }}ms · Status: {{ status }}
    </p>

    <div class="mt-4 flex flex-wrap gap-2">
      <SciFiButton
        label="Start Mining"
        :disabled="isCargoFull"
        @click="player.startMining('iron')"
      />
      <SciFiButton
        variant="danger"
        label="Stop Mining"
        @click="player.stopMining()"
      />
      <SciFiButton
        variant="ghost"
        label="Jettison"
        @click="player.jettison()"
      />
    </div>
  </TerminalBox>
</template>
