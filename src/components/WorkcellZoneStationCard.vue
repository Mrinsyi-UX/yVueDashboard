<script setup>
import { computed } from 'vue'
import MiniBarChart from './MiniBarChart.vue'

const props = defineProps({
  wc: Object,
})

/* -------------------------------------------
   CARD COLOR BASED ON WORKCELL STATUS
------------------------------------------- */
const cardColor = computed(() => {
  switch (props.wc.status) {
    case 'Running':
      return 'rgba(0,153,51,0.4)'
    case 'Issue':
      return 'rgba(244,241,192,0.4)'
    case 'ShutDown':
      return 'rgba(255,26,26,0.4)'
    case 'Idle':
      return 'rgba(51,51,51,0.4)'
    default:
      return 'rgba(51,51,51,0.4)'
  }
})

/* -------------------------------------------
   NORMALIZE BACKEND DATA
------------------------------------------- */
const normalizedZones = computed(() =>
  props.wc.zones.map((zone) => ({
    zone_name: zone.zone_name,
    stations: zone.stations.map((st) => ({
      id: st.id,
      name: st.name,

      status:
        st.is_running && !st.has_anomaly
          ? 'Running'
          : st.is_running && st.has_anomaly
            ? 'Issue'
            : !st.is_running && st.has_anomaly
              ? 'ShutDown'
              : 'Idle',

      qty_in: st.material_in,
      output: st.prod_output,
      wip: st.wip,
      reject: st.reject_qty,
    })),
  })),
)

/* -------------------------------------------
   PLACEHOLDER CHART DATA
------------------------------------------- */
// Build chart payload for MiniBarChart
const chartPayload = computed(() => {
  if (!props.wc.hourly || props.wc.hourly.length === 0) return {}

  // Extract hours
  const hours = props.wc.hourly.map((h) => h.hour)

  // Get all station names from first hour
  const stationNames = props.wc.hourly[0].stations.map((s) => s.station)

  // Bar series for each station
  const stationSeries = stationNames.map((stName) => ({
    name: stName,
    type: 'bar',
    emphasis: { focus: 'series' },
    data: props.wc.hourly.map((h) => {
      const st = h.stations.find((s) => s.station === stName)
      return st ? st.current_output : 0
    }),
  }))

  // Workcell trend line (sum of stations per hour)
  const wcLine = {
    name: 'WC Total',
    type: 'line',
    smooth: true,
    lineStyle: { width: 3, color: '#00ff99' },
    symbol: 'circle',
    data: props.wc.hourly.map((h) => {
      const total = h.stations.reduce((sum, s) => sum + s.current_output, 0)
      const count = h.stations.length || 1 // avoid division by zero
      return total / count
    }),
  }

  return {
    hours,
    series: [...stationSeries, wcLine],
  }
})
</script>

<template>
  <div
    class="neon-panel rounded-xl p-5 h-[800px] flex flex-col shadow-lg border border-[#0a2236]"
    :style="{ backgroundColor: cardColor }"
  >
    <!-- WORKCELL TITLE -->
    <h2 class="neon-title text-2xl mb-4 font-bold">
      {{ wc.name }}
      <span :style="{ color: wc.status === 'Running' ? '#00ff99' : '#ff4444' }">
        ({{ wc.status }})
      </span>
    </h2>

    <!-- SCROLLABLE CONTENT (TABLES) -->
    <div class="flex-1 overflow-y-auto pr-2">
      <div
        v-for="zone in normalizedZones"
        :key="zone.zone_name"
        class="mb-10 pb-6 border-b border-[#1a2a38]"
      >
        <!-- ZONE TITLE -->
        <h3 class="text-lg font-bold mb-3 text-[#6cf2ff]">ZONE {{ zone.zone_name }}</h3>

        <!-- TABLE -->
        <div class="overflow-x-auto rounded-md">
          <table class="min-w-full text-sm border-separate border-spacing-y-1">
            <thead class="bg-[#02375f] text-[#6cf2ff] font-semibold shadow shadow-[#00aaff55]">
              <tr>
                <th class="px-3 py-1 w-32 text-left">Station</th>
                <th class="px-3 py-1 w-24 text-left">Status</th>
                <th class="px-3 py-1 w-20 text-left">Qty In</th>
                <th class="px-3 py-1 w-20 text-left">Output</th>
                <th class="px-3 py-1 w-20 text-left">WIP</th>
                <th class="px-3 py-1 w-20 text-left">Reject</th>
                <th class="px-3 py-1 w-24 text-left">Expected Output</th>
                <th class="px-3 py-1 w-20 text-left">Variance</th>
                <th class="px-3 py-1 w-20 text-left">Expected CT</th>
                <th class="px-3 py-1 w-20 text-left">Actual CT</th>
                <th class="px-3 py-1 w-24 text-left">Run Time</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="s in zone.stations"
                :key="s.id"
                class="bg-[#0a1e2e] text-white hover:bg-[#12344d] transition"
              >
                <td class="px-2 py-2">{{ s.name }}</td>

                <td
                  class="px-2 py-2 font-semibold"
                  :style="{
                    color:
                      s.status === 'Running'
                        ? '#00ff99'
                        : s.status === 'Issue'
                          ? '#ffcc00'
                          : s.status === 'ShutDown'
                            ? '#ff4444'
                            : '#cccccc',
                  }"
                >
                  {{ s.status }}
                </td>

                <td class="px-3 py-1">{{ s.qty_in }}</td>
                <td class="px-3 py-1">{{ s.output }}</td>
                <td class="px-3 py-1">{{ s.wip }}</td>
                <td class="px-3 py-1">{{ s.reject }}</td>

                <!-- Placeholder -->
                <td class="px-3 py-1">0</td>
                <td class="px-3 py-1">0</td>
                <td class="px-3 py-1">0</td>
                <td class="px-3 py-1">0</td>
                <td class="px-3 py-1">0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Make chart scroll horizontally -->
    <div class="chart-scroll-wrapper"></div>
    <div class="mt-4 w-full overflow-x-auto overflow-y-hidden">
      <div style="min-width: 1200px">
        <MiniBarChart :chart="chartPayload" />
      </div>
    </div>
  </div>
</template>
