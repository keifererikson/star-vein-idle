<script setup lang="ts">
import { storeToRefs } from 'pinia'

import ActionButton from '@/components/Action/ActionButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const {
  currencies,
  skills,
  ship,
  status,
  cargoUsed,
  lastActiveTimestamp,
  lastSaveTimestamp,
} = storeToRefs(player)
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
          Mining Level: {{ skills.mining.level }} ({{ skills.mining.xp }} XP)
        </p>
      </TerminalBox>

      <TerminalBox title="Ship">
        <p class="font-mono text-sm">Name: {{ ship.name }}</p>
        <p class="font-mono text-sm">Status: {{ status }}</p>
        <p class="tick-number font-mono text-sm">
          Cargo Used: {{ cargoUsed }} / {{ ship.stats.maxCargo }} m³
        </p>
        <p class="font-mono text-xs text-slate-500">
          {{ JSON.stringify(ship.cargo) }}
        </p>
      </TerminalBox>

      <TerminalBox title="Systems">
        <p class="font-mono text-xs text-slate-500">
          Progress auto-saves on change. Checkpoint records time and flushes storage.
        </p>
        <p class="font-mono text-sm">
          Last Checkpoint:
          {{
            lastSaveTimestamp
              ? new Date(lastSaveTimestamp).toLocaleString()
              : 'Never'
          }}
        </p>
        <p class="tick-number font-mono text-xs text-slate-500">
          Last active:
          {{
            lastActiveTimestamp
              ? new Date(lastActiveTimestamp).toLocaleString()
              : '—'
          }}
        </p>
        <div class="mt-3 flex flex-wrap gap-2">
          <ActionButton
            label="Mark Checkpoint"
            @click="player.markCheckpoint()"
          />
          <ActionButton
            variant="danger"
            label="Hard Reset"
            @click="player.hardReset()"
          />
        </div>
      </TerminalBox>
    </div>
  </TerminalBox>
</template>
