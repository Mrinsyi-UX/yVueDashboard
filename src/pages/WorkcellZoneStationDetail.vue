<template>
  <div class="p-10">
    <h1 class="neon-title text-4xl mb-10 font-bold tracking-wide">
      Workcells – Zones – Stations Overview
    </h1>

    <!-- ⭐ DATE PICKER -->
    <div class="mb-6">
      <label class="text-white font-semibold mr-3">Select Date:</label>
      <input
        type="date"
        v-model="selectedDate"
        @change="refreshAll"
        class="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
      />
    </div>

    <!-- 2-COLUMN GRID -->
    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">
      <WorkcellZoneStationCard
        v-for="wc in workcells"
        :key="wc.id"
        :wc="wc"
        :selected-date="selectedDate"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
//import axios from "axios";
import WorkcellZoneStationCard from '../components/WorkcellZoneStationCard.vue'
import api from '../services/api.js'

// -----------------------------------------
// STATE
// -----------------------------------------
//const selectedDate = ref("2025-12-09");
const selectedDate = ref(new Date().toISOString().slice(0, 10))
const workcells = ref([])
const hourlyOutput = ref([])

// -----------------------------------------
// 1) Fetch Main Workcell Summary
// -----------------------------------------
async function fetchWorkcells() {
  const res = await api.get('api/wzs_card', {
    params: { date: selectedDate.value },
  })
  workcells.value = res.data
}

// -----------------------------------------
// 2) Fetch Hourly Output per Workcell
// -----------------------------------------
async function fetchHourly() {
  const res = await api.get('api/station_output_hourly', { params: { date: selectedDate.value } })
  hourlyOutput.value = res.data
}

// -----------------------------------------
// 3) Merge both queries together
// -----------------------------------------
function mergeHourly() {
  workcells.value = workcells.value.map((wc) => {
    const match = hourlyOutput.value.find((x) => x.wc === wc.id)
    return {
      ...wc,
      hourly: match ? match.hours : [], // <-- this is used by your MiniBarChart.vue
    }
  })
}

// -----------------------------------------
// 4) Reload everything
// -----------------------------------------
async function refreshAll() {
  await fetchWorkcells()
  await fetchHourly()
  mergeHourly()
}

// -----------------------------------------
// 5) Load on startup
// -----------------------------------------
onMounted(() => {
  refreshAll()
})

// -----------------------------------------
// 6) Auto refresh when date changes
// -----------------------------------------
watch(selectedDate, () => {
  refreshAll()
})
</script>
