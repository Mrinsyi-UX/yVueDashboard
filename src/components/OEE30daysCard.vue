<template>
  <OEEOverallCard>
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-semibold text-[#00eaff]">
        OEE — Last 30 Days
      </h2>
    </div>

    <div class="grid grid-cols-[100px_1fr] items-center">

      <!-- LEFT: KPI COLUMN -->
      <div class="grid grid-rows-3 gap-6">

        <div>
          <p class="text-xs text-[#7cffc4]">Availability</p>
          <p class="text-lg font-bold text-[#7cffc4]">
            {{ availability }}%
          </p>
        </div>

        <div>
          <p class="text-xs text-[#ffd166]">Performance</p>
          <p class="text-lg font-bold text-[#ffd166]">
            {{ performance }}%
          </p>
        </div>

        <div>
          <p class="text-xs text-[#9cff57]">Quality</p>
          <p class="text-lg font-bold text-[#9cff57]">
            {{ quality }}%
          </p>
        </div>

      </div>

      <!-- RIGHT: DONUT -->
      <div class="flex justify-center items-center">
        <div ref="chartRef" class="h-56 w-56"></div>
      </div>

    </div>
  </OEEOverallCard>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"
import axios from "axios"
import OEEOverallCard from "./OEEOverallCard.vue"

const chartRef = ref(null)
let chart = null

// 🔹 STATE
const availability = ref(0)
const performance = ref(0)
const quality = ref(0)
const oee = ref(0)

// 🔹 FETCH DATA (NO PARAMS)
async function fetchData() {
  const res = await axios.get(
    "http://localhost:8000/api/oee/OEE_30days"
  )

  const data = res.data[0]

  availability.value = data.availability
  performance.value = data.performance
  quality.value = data.quality
  oee.value = data.oee

  renderChart()
}

onMounted(async () => {
  chart = echarts.init(chartRef.value)
  await fetchData()
})

onBeforeUnmount(() => {
  chart?.dispose()
})

// 🔹 CHART
function renderChart() {
  chart.setOption({
    backgroundColor: "transparent",
    series: [
      ring(quality.value, "#5cff9d", ["85%", "95%"]),
      ring(availability.value, "#ffd166", ["70%", "80%"]),
      ring(performance.value, "#f4a261", ["55%", "65%"]),
      ring(oee.value, "#ff5c5c", ["40%", "50%"], true),
    ],
  })
}

function ring(value, color, radius, showLabel = false) {
  return {
    type: "pie",
    silent: true,
    radius,
    label: showLabel
      ? {
          show: true,
          position: "center",
          formatter: `${value}%`,
          fontSize: 36,
          fontWeight: "bold",
          color: "#ffffff",
        }
      : { show: false },
    data: [
      { value, itemStyle: { color } },
      { value: 100 - value, itemStyle: { color: "#0a254f" } },
    ],
  }
}
</script>
