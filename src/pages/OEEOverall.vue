<template>
  <div class="min-h-screen bg-[#010a1a] p-6 text-white">
    <h1 class="text-3xl font-bold mb-8 text-center text-[#00baff] tracking-wide">OEE Dashboard</h1>

    <!-- 3x3 GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ROW 1 -->
      <OEEYearCard />
      <OEE30DaysCard />
      <OEEBarChart30days />

      <!-- ROW 2 -->
      <DowntimeBC7Days v-if="weeklyduration" :chart="weeklyduration" />
      <DowntimeBC30days />
      <OEEBC12month />
    </div>
  </div>
</template>

<script setup>
// Vue
import { ref, onMounted } from 'vue'

import OEEYearCard from '../components/OEEYearCard.vue'
import OEE30DaysCard from '../components/OEE30daysCard.vue'
import OEEBarChart30days from '../components/OEEBarChart30days.vue'
import DowntimeBC7Days from '../components/DowntimeBC7days.vue'
import DowntimeBC30days from '@/components/DowntimeBC30days.vue'
import OEEBC12month from '@/components/OEEBC12month.vue'
// API
import api from '@/services/api.js'

//Variable
//const selectedDate = ref(new Date().toISOString().split('T')[0])
const weeklyduration = ref([])
const loading = ref(false)

// -----------------------------------------
// FETCH SNAPSHOT (TABLE DATA)
// -----------------------------------------
const fetch_downtime_7days = async () => {
  // The loading data process is ongoing
  loading.value = true
  try {
    // Get data from api
    const res = await api.get('/api/downtime7days')

    // Asign a variable to contain the data
    weeklyduration.value = res.data

      // mapping the data to name and make some adjustment on calculation
      .map((d) => ({
        name: d.anomaly_type,
        minutes: Math.round(d.duration7days / 60),
      }))

      // Sort the data from largest to smalles
      .sort((a, b) => b.minutes - a.minutes)
  } catch (err) {
    console.error('Failed to get 7 days data', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetch_downtime_7days()
})
</script>
