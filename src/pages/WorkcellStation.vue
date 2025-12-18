<template>
  <div class="p-6 bg-[#0F1828] min-h-screen">
    <h1 class="text-3xl font-bold text-white mb-6">
      WORK CELL M/C STATUS BY STATION
      <span>
        <input
          type="date"
          v-model="selectedDate"
          @change="fetchData"
          class="bg-[#021027] text-white border border-cyan-400 rounded px-2 py-1"
        />
      </span>
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <WorkcellCard v-for="(wc, i) in workcells" :key="i" :workcell="wc" />
    </div>
  </div>
</template>

<script setup>
import WorkcellCard from '../components/WorkcellStationCard.vue'
//import { workcells } from "../data/workcell_data.js";             //Fake Data
import { ref, onMounted, onUnmounted } from 'vue'
//import axios from "axios";
import api from '../services/api.js'

// Default date = today
const selectedDate = ref(new Date().toISOString().split('T')[0])

const workcells = ref([])

let refreshTimer = null

// Main data loader
async function fetchData() {
  try {
    const res = await api.get('/api/workcell_station', {
      params: { date: selectedDate.value },
    })
    workcells.value = res.data
  } catch (err) {
    console.error('Failed to load:', err)
  }
}

onMounted(() => {
  fetchData() // load immediately when page is opened

  // Refresh every 5 minutes (300,000 ms)
  refreshTimer = setInterval(() => {
    console.log('Auto-refresh triggered')
    fetchData()
  }, 300000)
})

onUnmounted(() => {
  clearInterval(refreshTimer) // avoid double timers when switching pages
})
</script>
