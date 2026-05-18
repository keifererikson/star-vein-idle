<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { Coins, Package } from 'lucide-vue-next'

import ActionButton from '@/components/Action/ActionButton.vue'
import TerminalBox from '@/components/Content/TerminalBox.vue'
import { RESOURCES, type ResourceId } from '@/lib/constants'
import { usePlayerStore } from '@/stores/usePlayerStore'

const player = usePlayerStore()
const { ship } = storeToRefs(player)

const cargoItems = computed(() => {
  const items: Array<{ id: ResourceId, name: string, amount: number, value: number, volume: number }> = []
  for (const [resId, amount] of Object.entries(ship.value.cargo)) {
    if (amount && amount > 0) {
      const resourceId = resId as ResourceId
      const resource = RESOURCES[resourceId]
      items.push({
        id: resourceId,
        name: resource.name,
        amount,
        value: resource.baseValue * amount,
        volume: resource.volumePerUnit * amount
      })
    }
  }
  return items
})

const totalCargoValue = computed(() => {
  return cargoItems.value.reduce((sum, item) => sum + item.value, 0)
})
</script>

<template>
  <TerminalBox
    title="Relay Exchange"
    subtitle="Market, cargo, and fleet logistics"
  >
    <div class="mb-4 flex items-center justify-between">
      <h3 class="font-mono text-sm font-semibold text-slate-300">Cargo Hold</h3>
      <div class="flex flex-col w-48">
        <div class="flex items-center justify-end gap-1.5 text-slate-400 mb-1">
          <Package class="size-4" />
          <span class="tick-number text-xs">{{ player.cargoSummary }}</span>
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

    <div v-if="cargoItems.length === 0" class="text-sm text-slate-500 italic font-mono mb-6">
      Cargo hold is empty.
    </div>

    <div v-else class="space-y-3 mb-6">
      <div 
        v-for="item in cargoItems" 
        :key="item.id"
        class="bg-slate-900 border border-slate-700 p-3 rounded flex items-center justify-between"
      >
        <div>
          <div class="font-mono text-sm text-slate-200">{{ item.name }}</div>
          <div class="font-mono text-xs text-slate-500 flex items-center gap-2 mt-1">
            <span>Qty: {{ item.amount }} ({{ item.volume }} m³)</span>
            <span class="text-slate-600">•</span>
            <span class="flex items-center gap-1">
              <Coins class="size-3" />
              {{ item.value.toLocaleString() }} CR
            </span>
          </div>
        </div>
        <ActionButton 
          variant="primary" 
          label="Sell" 
          @click="player.sellResource(item.id, item.amount)" 
        />
      </div>

      <div class="pt-4 border-t border-slate-800 flex items-center justify-between">
        <div class="font-mono text-sm text-emerald-400 flex items-center gap-1.5">
          <Coins class="size-4" />
          <span>Total Value: {{ totalCargoValue.toLocaleString() }} CR</span>
        </div>
        <ActionButton 
          variant="primary" 
          label="Sell All Cargo" 
          @click="player.sellAllCargo()" 
        />
      </div>
    </div>
  </TerminalBox>
</template>
