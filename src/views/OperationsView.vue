<script setup lang="ts">
import { storeToRefs } from 'pinia'

import SciFiButton from '@/components/Action/SciFiButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const { currencies, skills, ship, status, lastTickTimestamp, lastSaveTimestamp } =
  storeToRefs(player)
</script>

<template>
  <TerminalBox
    title="Operations"
    subtitle="Fleet status and command overview"
  >
    <div class="grid gap-4 md:grid-cols-2">
      <TerminalBox title="Currencies">
        <p class="tick-number font-mono text-sm">
          Credits: {{ currencies.credits }} CR
        </p>
        <p class="tick-number font-mono text-sm">
          Data: {{ currencies.data }}
        </p>
      </TerminalBox>

      <TerminalBox title="Skills">
        <p class="font-mono text-sm">
          Mining Level: {{ skills.miningLevel }}
        </p>
      </TerminalBox>

      <TerminalBox title="Ship">
        <p class="font-mono text-sm">Name: {{ ship.name }}</p>
        <p class="font-mono text-sm">Status: {{ status }}</p>
        <p class="tick-number font-mono text-sm">
          Cargo Used: {{ ship.cargoUsed }} / {{ ship.stats.maxCargo }} m³
        </p>
        <p class="font-mono text-xs text-slate-500">
          {{ JSON.stringify(ship.cargo) }}
        </p>
      </TerminalBox>

      <TerminalBox title="Systems">
        <p class="tick-number font-mono text-sm">
          Last Tick: {{ lastTickTimestamp / 1000 }}s
        </p>
        <p class="font-mono text-sm">
          Last Save:
          {{
            lastSaveTimestamp
              ? new Date(lastSaveTimestamp).toLocaleString()
              : 'Never'
          }}
        </p>
        <div class="mt-3">
          <SciFiButton
            label="Save"
            @click="player.markSaved()"
          />
        </div>
      </TerminalBox>
    </div>
  </TerminalBox>
</template>
