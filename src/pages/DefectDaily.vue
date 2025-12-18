<template>
  <div class="dashboard-grid p-6" style="overflow: visible !important">
    <!-- 🔹 Row 1 -->
    <div class="chart-card">
      <h2 class="chart-title">Yield (Daily - Always show 30 days)</h2>
      <DefectYieldChart />
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Defect % (Daily)</h2>

      <!-- 🔹 Date Range Selector -->
      <div class="date-controls">
        <label>Start:</label>
        <input type="date" v-model="startDate" @change="fetchData" />

        <label>End:</label>
        <input type="date" v-model="endDate" @change="fetchData" />
      </div>

      <DefectPieChart :data="chartData" />
    </div>

    <!-- 🔹 Row 2 -->
    <div class="chart-card">
      <h2 class="chart-title">Yield (Hourly)</h2>
      <LeakHourlyChart style="overflow: visible !important" />
    </div>

    <div class="chart-card">
      <h2 class="chart-title">Pareto (Hourly)</h2>
      <ParetoChart :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import axios from 'axios'
import DefectPieChart from '../components/DefectPieChart.vue'
import ParetoChart from '../components/ParetoChart.vue'
import DefectYieldChart from '../components/DefectYieldChart.vue'
import LeakHourlyChart from '@/components/LeakHourlyChart.vue'
import api from '@/services/api'

const chartData = ref([])
//const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const startDate = ref(new Date().toISOString().slice(0, 10))
const endDate = ref(new Date().toISOString().slice(0, 10))

const fetchData = async () => {
  const res = await api.get(`/api/leak_defects`, {
    params: {
      start: startDate.value,
      end: endDate.value,
    },
  })

  const grouped = {}
  for (const row of res.data) {
    if (row.total_occurrences > 0) {
      grouped[row.defect_or_position] =
        (grouped[row.defect_or_position] || 0) + row.total_occurrences
    }
  }

  chartData.value = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }))
}

onMounted(fetchData)
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  gap: 1.5rem;
  background: radial-gradient(circle at center, #1a0240 0%, #0a0020 100%);
  color: white;
}

.chart-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 186, 255, 0.3);
  border-radius: 12px;
  padding: 1rem;
  position: relative;
  overflow: visible;
  box-shadow: 0 0 20px rgba(0, 186, 255, 0.15);
}

.chart-title {
  text-align: center;
  color: #00baff;
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}
</style>
