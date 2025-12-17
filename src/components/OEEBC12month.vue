<template>
  <OEEOverallCard>
    <h2 class="text-xl font-semibold text-[#00eaff] mb-2">
      OEE — Last 12 Month
    </h2>

    <!-- Bar chart -->
    <div ref="chartRef" class="h-56 w-full"></div>
  </OEEOverallCard>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"
import * as echarts from "echarts"
import OEEOverallCard from "./OEEOverallCard.vue"

const chartRef = ref(null)
let chart = null

// 🔹 DEMO DATA (replace later from API)
const month = [
  "01","02","03","04","05","06",
  "07","08","09","10","11","12"
]


const oeeData = [
  68, 70, 69, 71, 72, 70,
  69, 71, 73, 72, 70, 69
]

const availabilityData = new Array(month.length).fill(55)
const performanceData  = new Array(month.length).fill(93)
const qualityData      = new Array(month.length).fill(79)

onMounted(() => {
  chart = echarts.init(chartRef.value)

  chart.setOption({
  backgroundColor: "transparent",

  legend: {
    top: 0,
    textStyle: {
      color: "#cbd5e1",
      fontSize: 11,
    },
  },

  grid: {
    left: 40,
    right: 20,
    top: 40,   // ⬅ make room for legend
    bottom: 40,
  },

  xAxis: {
    type: "category",
    data: month,
    axisLine: { lineStyle: { color: "#445" } },
    axisTick: { show: false },
    axisLabel: { color: "#aaa", fontSize: 10 },
  },

  yAxis: {
    type: "value",
    min: 0,
    max: 100,
    splitLine: {
      lineStyle: { color: "#1f3555", type: "dashed" },
    },
    axisLabel: { color: "#aaa" },
  },

  tooltip: {
    trigger: "axis",
    axisPointer: { type: "shadow" },
    backgroundColor: "#031739",
    borderColor: "#00baff",
    textStyle: { color: "#fff" },
  },

  series: [
    {
      name: "Availability",
      type: "bar",
      stack: "total",
      data: availabilityData,
      itemStyle: { color: "#7cffc4" },
      barWidth: "60%",
    },
    {
      name: "Performance",
      type: "bar",
      stack: "total",
      data: performanceData,
      itemStyle: { color: "#ffd166" },
    },
    {
      name: "Quality",
      type: "bar",
      stack: "total",
      data: qualityData,
      itemStyle: { color: "#89CFF0" },
    },
    {
      name: "OEE",
      type: "line",
      data: oeeData,
      symbol: "circle",
      symbolSize: 6,
      lineStyle: {
        color: "#00eaff",
        width: 2,
      },
    },
  ],
})



})

onBeforeUnmount(() => {
  chart?.dispose()
})
</script>
