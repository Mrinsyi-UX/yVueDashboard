<template>
  <div class="min-h-screen bg-[#010a1a] p-6 text-white">
    <h1 class="text-3xl font-bold mb-8 text-center text-[#00baff] tracking-wide">
      Workcell Detail Type 4
    </h1>
    <!-- FILTER BAR -->
    <div class="flex flex-wrap gap-4 justify-center mb-6">
      <!-- DATE -->
      <div class="flex items-center gap-2">
        <label class="text-cyan-300 font-semibold">Date</label>
        <input
          type="date"
          v-model="selectedDate"
          class="bg-[#020d24] border border-cyan-400 rounded px-3 py-1 text-white"
        />
      </div>

      <!-- WORKCELL -->
      <div class="flex items-center gap-2">
        <label class="text-cyan-300 font-semibold">Workcell</label>
        <select
          v-model="selectedWorkcellId"
          class="bg-[#020d24] border border-cyan-400 rounded px-3 py-1 text-white"
        >
          <option v-for="wc in snapshotData" :key="wc.id" :value="wc.id">
            {{ wc.name }}
          </option>
        </select>
      </div>
    </div>

    <!-- 2x2 GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- CARD 1 : TABLE -->
      <NeonCard>
        <ZoneStationTable v-if="selectedWorkcell" :workcell="selectedWorkcell" />
      </NeonCard>

      <NeonCard>
        <WorkcellStationCard v-if="stationsdata" :workcell="stationsdata" />
      </NeonCard>

      <NeonCard>
        <OutputBarChartHourly v-if="hourlyOutputChart" :chart="hourlyOutputChart" />
      </NeonCard>
      <NeonCard
        ><CTBarChartHourly
          v-if="hourlyCTChart"
          :hours="hourlyCTChart.hours"
          :series="hourlyCTChart.series"
        />
      </NeonCard>
    </div>
  </div>
</template>

<script setup>
// Vue
import { ref, onMounted, watch, computed } from 'vue'

// Components
import NeonCard from '@/components/NeonCard.vue'
//import TestChild from '@/components/TestChild.vue'
import ZoneStationTable from '@/components/Table/ZoneTable.vue'
import OutputBarChartHourly from '@/components/BarChart/OutputBarChartHourly.vue'
import WorkcellStationCard from '@/components/WorkcellStationCard.vue'
import CTBarChartHourly from '@/components/BarChart/CTBarChartHourly.vue'

// API
import api from '@/services/api.js'

// -----------------------------------------
// STATE
// -----------------------------------------
const selectedDate = ref(new Date().toISOString().split('T')[0])
const snapshotData = ref([])
const stations = ref([])
const selectedWorkcellId = ref(null)
const loading = ref(false)
const hourlyRaw = ref(null)
const hourlyCTRaw = ref(null)

// -----------------------------------------
// FETCH SNAPSHOT (TABLE DATA)
// -----------------------------------------
const fetchSnapshot = async () => {
  loading.value = true
  try {
    const res = await api.get('/api/wzs_card', {
      params: { date: selectedDate.value },
    })
    snapshotData.value = res.data
    if (!selectedWorkcellId.value && res.data.length) {
      selectedWorkcellId.value = res.data[0].id
    }
  } finally {
    loading.value = false
  }
}

// -----------------------------------------
// FETCH HOURLY OUTPUT (CHART DATA)
// -----------------------------------------
const fetchHourlyOutput = async () => {
  const res = await api.get('/api/station_output_hourly', {
    params: { date: selectedDate.value },
  })
  hourlyRaw.value = res.data[0]
}

// -----------------------------------------
// FETCH Station Data (Progress Card Data)
// -----------------------------------------
async function fetchStation() {
  try {
    const res = await api.get('/api/workcell_station', {
      params: { date: selectedDate.value },
    })
    stations.value = res.data
  } catch (err) {
    console.error('Failed to load:', err)
  }
}

// -----------------------------------------
// FETCH HOURLY CT (CHART DATA)
// -----------------------------------------
const fetchHourlyCT = async () => {
  const res = await api.get('/api/cycle_time_hourly', {
    params: { date: selectedDate.value },
  })
  hourlyCTRaw.value = res.data[0]
}

// -----------------------------------------
// CHART TRANSFORMATION
// -----------------------------------------
const hourlyOutputChart = computed(() => {
  if (!hourlyRaw.value || !hourlyRaw.value.hours?.length) return null

  const hours = hourlyRaw.value.hours.map((h) => h.hour)
  const stationNames = hourlyRaw.value.hours[0].stations.map((s) => s.station)

  const series = stationNames.map((stationName) => ({
    name: stationName,
    type: 'bar',
    data: hourlyRaw.value.hours.map((hourBlock) => {
      const st = hourBlock.stations.find((s) => s.station === stationName)
      return st ? st.current_output : 0
    }),
  }))

  return { hours, series }
})

// -----------------------------------------
// CHART CT TRANSFORMATION
// -----------------------------------------
const ctDeviationLine = computed(() => {
  if (!hourlyCTRaw.value?.stations?.length) return []

  return hourlyCTRaw.value.stations.map((st) => ({
    name: `${st.station_name} ΔCT`,
    type: 'line',
    yAxisIndex: 1, // second axis
    smooth: true,
    data: st.hours.map((h) => {
      if (h.avg_cycle_time === 0) return 0
      return Math.round(st.declared_cycletime - h.avg_cycle_time, 1)
    }),
  }))
})

const hourlyCTChart = computed(() => {
  if (!hourlyCTRaw.value?.stations?.length) return null

  const hours = hourlyCTRaw.value.stations[0].hours.map((h) => h.hour)

  const series = hourlyCTRaw.value.stations.map((st) => ({
    name: `Station ${st.station_name}`,
    type: 'bar',
    data: st.hours.map((h) => h.avg_cycle_time),
  }))

  return { hours, series: [...series, ...ctDeviationLine.value] }
})

// -----------------------------------------
// DERIVED STATE
// -----------------------------------------
const selectedWorkcell = computed(() =>
  snapshotData.value.find((wc) => wc.id === selectedWorkcellId.value),
)

// -----------------------------------------
// DERIVED STATE
// -----------------------------------------
const stationsdata = computed(() => stations.value.find((wc) => wc.id === selectedWorkcellId.value))

// -----------------------------------------
// LIFECYCLE
// -----------------------------------------
onMounted(() => {
  fetchSnapshot()
  fetchHourlyOutput()
  fetchStation()
  fetchHourlyCT()
})

watch(selectedDate, () => {
  fetchSnapshot()
  fetchHourlyOutput()
  fetchStation()
  fetchHourlyCT()
})
</script>
