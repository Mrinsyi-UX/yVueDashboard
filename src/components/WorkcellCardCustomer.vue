<template>
  <div
    class="bg-gradient-to-br from-blue-900/80 to-blue-800/40 rounded-xl border border-cyan-400/30 shadow-[0_0_20px_rgba(0,255,255,0.15)] p-4 h-[220px] flex gap-4"
  >
    <!-- IMAGE COLUMN -->
    <div class="w-54 flex items-center justify-center">
      <img :src="getWorkcellImage(wc.workcell_name)" class="rounded-lg max-h-24 object-contain" />
    </div>

    <!-- INFO -->
    <div class="flex flex-col justify-between text-white text-sm flex-1">
      <h3 class="text-cyan-300 font-semibold text-lg">
        {{ wc.workcell_name }}
      </h3>
      <div class="space-y-">
        <p>Online M/C: {{ wc.active_stations }} / {{ wc.total_stations }}</p>
        <p>
          Downtime Time :
          <span class="text-red-400">
            {{ formatDuration(wc.downtime_seconds) }}
          </span>
        </p>

        <p>
          Running Time :
          <span class="text-green-400">
            {{ formatDuration(wc.running_time_seconds) }}
          </span>
        </p>

        <p>M/C Output : {{ wc.total_quantity_completed }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatDuration } from '@/util/time_formater.js'

defineProps({ wc: Object })

const imageFile = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')

const getWorkcellImage = (name) => {
  try {
    return new URL(`../images/${imageFile(name)}.png`, import.meta.url).href
  } catch {
    return new URL('../images/default.png', import.meta.url).href
  }
}
</script>
