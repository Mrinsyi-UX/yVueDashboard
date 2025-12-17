<template>
  <OEEOverallCard>
    <h2 class="text-xl font-semibold text-[#00eaff] mb-2">
      Downtime — Last 7 Days
    </h2>

    <div ref="chartRef" class="h-64 w-full"></div>
  </OEEOverallCard>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"
import OEEOverallCard from "./OEEOverallCard.vue"

// ================================
// Chart refs
// ================================
const chartRef = ref(null)
let chart = null

// ================================
// Stable random color system
// ================================
const colorCache = {}

function generateColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 55%)` // dark-theme friendly
}

function getColorByIndex(index) {
  if (!colorCache[index]) {
    colorCache[index] = generateColor()
  }
  return colorCache[index]
}

// ================================
// DEMO DATA (minutes)
// ================================
const reasons = [
  "UNCOMMENTED",
  "BREAK",
  "MATERIAL SHORTAGE",
  "UNPLANNED CLEANING",
  "MATERIAL QUALITY ISSUES",
  "PRODUCT CHANGEOVER",
  "ELECTRICAL FAILURE",
  "SET UP",
  "MACHINE RESET",
  "OPERATOR MISSING",
]

const minutes = [840, 780, 536, 452, 387, 340, 310, 262, 217, 205]

// ================================
// Chart init
// ================================
onMounted(() => {
  chart = echarts.init(chartRef.value)

  chart.setOption({
    backgroundColor: "transparent",

    grid: {
      left: 140,
      right: 30,
      top: 10,
      bottom: 20,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      backgroundColor: "#031739",
      borderColor: "#00baff",
      textStyle: { color: "#fff" },
      formatter: (params) => {
        const m = params[0].value
        const h = Math.floor(m / 60)
        const min = m % 60
        return `${params[0].name}<br/>${h}h ${min}m`
      },
    },

    xAxis: {
      type: "value",
      axisLabel: {
        color: "#aaa",
        formatter: (v) => `${Math.floor(v / 60)}h`,
      },
      splitLine: {
        lineStyle: { color: "#1f3555", type: "dashed" },
      },
    },

    yAxis: {
      type: "category",
      data: reasons,
      inverse: true,
      axisLabel: { color: "#cbd5e1", fontSize: 11 },
      axisTick: { show: false },
      axisLine: { show: false },
    },

    series: [
      {
        type: "bar",
        data: minutes,
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: (params) => getColorByIndex(params.dataIndex),
        },
      },
    ],
  })
})

// ================================
// Cleanup
// ================================
onBeforeUnmount(() => {
  chart?.dispose()
})
</script>

