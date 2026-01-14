<template>
  <OEEOverallCard>
    <h2 class="text-xl font-semibold text-[#00eaff] mb-2">Downtime — Last 7 Days</h2>

    <div ref="chartRef" class="h-64 w-full"></div>
  </OEEOverallCard>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as echarts from 'echarts'
import OEEOverallCard from './OEEOverallCard.vue'

// ========================
// Props
// ========================
const props = defineProps({
  chart: {
    type: Array,
    required: true,
  },
})

// ========================
// Chart refs
// ========================
const chartRef = ref(null)
let chartInstance = null

// ========================
// Stable color system
// ========================
const colorCache = {}

function generateColor() {
  const hue = Math.floor(Math.random() * 360)
  return `hsl(${hue}, 70%, 55%)`
}

function getColorByIndex(index) {
  if (!colorCache[index]) {
    colorCache[index] = generateColor()
  }
  return colorCache[index]
}

// ========================
// Init chart ONCE
// ========================
onMounted(() => {
  chartInstance = echarts.init(chartRef.value)

  chartInstance.setOption({
    backgroundColor: 'transparent',
    grid: {
      left: 140,
      right: 30,
      top: 10,
      bottom: 20,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const m = params[0].value
        const h = Math.floor(m / 60)
        const min = m % 60
        return `${params[0].name}<br/>${h}h ${min}m`
      },
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        color: '#e5e7eb', // light gray / near-white
        fontSize: 12,
        fontWeight: 500,
      },
      splitLine: {
        lineStyle: { type: 'dashed' },
      },
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLabel: {
        color: '#e5e7eb', // light gray / near-white
        fontSize: 12,
        fontWeight: 500,
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    series: [
      {
        type: 'bar',
        barWidth: 14,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: (params) => getColorByIndex(params.dataIndex),
        },
      },
    ],
  })
})

// ========================
// React to parent data
// ========================
watch(
  () => props.chart,
  (data) => {
    if (!chartInstance || !data.length) return

    chartInstance.setOption({
      yAxis: {
        data: data.map((d) => d.name),
      },
      series: [
        {
          data: data.map((d) => d.minutes),
        },
      ],
    })
  },
  { immediate: true },
)

// ========================
// Cleanup
// ========================
onBeforeUnmount(() => {
  chartInstance?.dispose()
})
</script>
