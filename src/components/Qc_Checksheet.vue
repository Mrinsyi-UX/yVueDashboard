<template>
  <div class="neon-panel p-5 text-white">
    <h2 class="text-xl font-semibold text-glow-blue mb-4">QC Checksheet – {{ selectedMonth }}</h2>

    <!-- Month selector -->
    <div class="flex items-center gap-3 mb-4">
      <label class="text-sm">Month:</label>
      <input
        type="month"
        v-model="selectedMonth"
        @change="fetchData"
        class="bg-[#021027] text-white rounded px-2 py-1 border border-[#00baff]"
      />
    </div>

    <!-- Table -->
    <div class="overflow-auto">
      <table class="border border-[#00baff] text-xs w-full">
        <thead class="bg-[#02203a] sticky top-0">
          <tr>
            <th class="border border-[#00baff] p-2 text-left w-56">Defect Name</th>
            <th
              v-for="day in daysInMonth"
              :key="day"
              class="border border-[#00baff] p-2 text-center min-w-[40px]"
            >
              {{ day }}
            </th>
            <th class="border border-[#00baff] p-2 text-center">Total</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="defect in defectList" :key="defect" class="hover:bg-[#03385a]">
            <td class="border border-[#00baff] p-2 text-left">
              {{ defect }}
            </td>

            <td
              v-for="day in daysInMonth"
              :key="day"
              class="border border-[#00baff] text-center align-middle"
            >
              <span v-if="getCount(defect, day)">
                {{ getCount(defect, day) }}
              </span>
            </td>

            <td class="border border-[#00baff] text-center font-bold">
              {{ getDefectTotal(defect) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
//import axios from 'axios'
import api from '@/services/api'

//const API = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'

const selectedMonth = ref(new Date().toISOString().slice(0, 7))
const rawData = ref([])

// 🧭 Fetch data from Flask
const fetchData = async () => {
  const res = await api.get(`api/qc_cs`, {
    params: { month: selectedMonth.value },
  })
  rawData.value = res.data
}

// 🗓 Generate all days in current month
const daysInMonth = computed(() => {
  const [year, month] = selectedMonth.value.split('-')
  const totalDays = new Date(year, month, 0).getDate()
  return Array.from({ length: totalDays }, (_, i) => i + 1)
})

// 🧾 Dynamic defect list from DB
const defectList = computed(() => {
  const uniqueNames = new Set(rawData.value.map((d) => d.defect_name))
  return Array.from(uniqueNames).sort()
})

// 🗂 Create fast lookup map
const defectMap = computed(() => {
  const map = {}
  rawData.value.forEach((d) => {
    const name = d.defect_name
    const date = new Date(d.log_date)
    const day = date.getUTCDate()
    if (!map[name]) map[name] = {}
    map[name][day] = d.total
  })
  return map
})

// 🔍 Get count for a defect + day
const getCount = (defect, day) => {
  return defectMap.value[defect]?.[day] || ''
}

// ➕ Get total for that defect across the month
const getDefectTotal = (defect) => {
  const days = defectMap.value[defect]
  if (!days) return 0
  return Object.values(days).reduce((sum, val) => sum + val, 0)
}

onMounted(fetchData)
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  white-space: nowrap;
  height: 28px;
}
</style>
