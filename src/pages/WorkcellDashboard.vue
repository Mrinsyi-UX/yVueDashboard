<template>
  <div class="p-5">
    <h1 class="text-3xl font-bold mb-6 text-white">Workcell High Level Machine Status</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <WorkcellCard v-for="cell in workcells" :key="cell.id" :cell="cell" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
//import axios from 'axios'
import WorkcellCard from '../components/WorkcellCard.vue'
import api from '../services/api.js'

const workcells = ref([])

// 🕒 Working hours
const START_HOUR = 8 // 8 AM
const END_HOUR = 17 // 5 PM

// 🕒 Runtime %
function calculateRuntimePercentage() {
  const now = new Date()

  const startTime = new Date()
  startTime.setHours(START_HOUR, 0, 0, 0)

  const endTime = new Date()
  endTime.setHours(END_HOUR, 0, 0, 0)

  const totalWorkMs = endTime - startTime

  let runtimePct = 0

  if (now < startTime) {
    runtimePct = 0
  } else if (now > endTime) {
    runtimePct = 100
  } else {
    runtimePct = ((now - startTime) / totalWorkMs) * 100
  }

  return runtimePct.toFixed(2)
}

async function loadWorkcell() {
  try {
    const res = await api.get('/api/workcell')

    const now = new Date()
    const startTime = new Date()
    startTime.setHours(START_HOUR, 0, 0, 0)

    const elapsedSeconds = (now - startTime) / 1000
    const runtimePercent = calculateRuntimePercentage()

    workcells.value = res.data.map((cell) => {
      const ct = Number(cell.AvgCycleTime) || 0
      const currentOutput = Number(cell.MinCycleOutput) || 0

      // ============================
      //   Expected Output Formula
      // ============================
      let expectedOutput = 0
      if (ct > 0 && elapsedSeconds > 0) {
        expectedOutput = elapsedSeconds / ct - currentOutput
      }

      // ============================
      //   Add + or - sign
      // ============================
      let formattedExpected = '0.0'

      if (expectedOutput > 0) {
        formattedExpected = '+' + expectedOutput.toFixed(1)
      } else if (expectedOutput < 0) {
        formattedExpected = expectedOutput.toFixed(1) // already negative
      } else {
        formattedExpected = '0.0'
      }

      return {
        ...cell,
        runtimePercentage: runtimePercent,
        expectedOutput: formattedExpected,
      }
    })

    console.log('Workcell data:', workcells.value)
  } catch (error) {
    console.error('Failed to load workcell:', error)
  }
}

onMounted(() => {
  loadWorkcell()
  setInterval(loadWorkcell, 5000)
})
</script>
