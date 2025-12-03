<script setup>
import { computed } from "vue";
import MiniBarChart from "./MiniBarChart.vue";
import { OUTPUT_BY_STATION } from "../data/outputByStation.js";

const props = defineProps({
  wc: Object
});

// Background color based on Workcell status
const cardColor = computed(() => {
  switch (props.wc.status) {
    case 'Running':
      return 'rgba(0,153,51,0.4)'        // green
    case 'Issue':
      return 'rgba(244,241,192,0.4)'     // pale yellow
    case 'No Man Power':
      return 'rgba(240,228,0,0.4)'       // yellow
    case 'Machine Error':
      return 'rgba(255,26,26,0.4)'       // red
    case 'Quality Issue':
      return 'rgba(255,204,153,0.4)'     // peach
    case 'Machine Setup':
      return 'rgba(0,153,255,0.4)'       // blue
    default:
      return 'rgba(51,51,51,0.4)'        // grey
  }
});

// 1) Find matching WC chart source
const chartSource = OUTPUT_BY_STATION.find(x => x.wc === props.wc.id);

// 2) Extract hours
const hours = chartSource.hours.map(h => h.hour);

// 3) Extract the 7 station names
const stationNames = chartSource.hours[0].stations.map(s => s.station);

// 4) Build BAR series for each station
const stationSeries = stationNames.map(stName => {
  return {
    name: stName,
    type: "bar",
    emphasis: { focus: "series" },
    data: chartSource.hours.map(h => {
      const station = h.stations.find(s => s.station === stName);
      return station ? station.current_output : 0;
    })
  };
});

// 5) Build total WC line series
const wcLineSeries = {
  name: "WC Total",
  type: "line",
  smooth: true,
  symbol: "circle",
  lineStyle: { width: 2 },
  data: chartSource.hours.map(h =>
    h.stations.reduce((sum, s) => sum + s.current_output, 0)
  )
};

// 6) Final chart payload
const chartPayload = {
  hours,
  series: [...stationSeries, wcLineSeries]
};
</script>

<template>
  <div
  class="neon-panel p-5 rounded-xl":style="{ backgroundColor: cardColor }">
    <h2 class="neon-title text-xl mb-4">
      {{ wc.name }}
      <span :style="{ color: wc.status === 'Running' ? '#00ff99' : '#ff4444' }">
        ({{ wc.status }})
      </span>
    </h2>

    <!-- Station table above -->
    <div v-for="zone in wc.zones" :key="zone.zone_name" class="mb-4">
        <!-- ZONE TITLE -->
        <h3 class="zone-title mb-2">{{ zone.zone_name }}</h3>

        <!-- NEON HEADER BAR -->
        <div
        class="flex text-sm font-semibold bg-[#02375f] text-[#6cf2ff]
                px-3 py-1 rounded-md ml-3 mb-2 shadow-md shadow-[#00aaff55]"
        >
        <div class="w-32">Station</div>
        <div class="w-24">Status</div>
        <div class="w-20">Qty</div>
        </div>

        <!-- ROWS -->
        <ul class="ml-3 text-sm space-y-1">
        <li v-for="s in zone.stations" :key="s.id" class="flex">
            
            <!-- Station Name -->
            <div class="w-32">{{ s.name }}</div>

            <!-- Status with colors -->
            <div
            class="w-24"
            :style="{
                color:
                s.status === 'Running'
                    ? '#00ff99'
                    : s.status === 'Error'
                    ? '#ff4444'
                    : '#ffffff'
            }"
            >
            {{ s.status }}
            </div>

            <!-- Qty -->
            <div class="w-20">{{ s.qty_in }} pcs</div>
        </li>
        </ul>


    </div>

    <div class="mt-6 w-full overflow-hidden">
        <MiniBarChart :chart="chartPayload" />
    </div>
  </div>
</template>
