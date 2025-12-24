<template>
  <div class="w-full h-full">
    <!-- EMPTY STATE -->
    <div v-if="!data.length" class="text-cyan-400 text-center pt-10">No defect recorded today</div>

    <!-- CHART -->
    <div v-else ref="chartRef" class="w-full h-full"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
})

const chartRef = ref(null)
let chart = null

const getColor = (val) => {
  if (val >= 30) return '#ff4d4f' // red
  if (val >= 10) return '#ffd166' // yellow
  return '#00ff99' // green
}

const renderChart = async () => {
  await nextTick()
  if (!chartRef.value) return

  if (!chart) {
    chart = echarts.init(chartRef.value)
  }

  chart.setOption({
    backgroundColor: 'transparent',

    grid: {
      left: 30,
      right: 30,
      top: 10,
      bottom: 50,
      containLabel: true,
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        color: '#94a3b8',
        formatter: '{value}%',
      },
    },

    yAxis: {
      type: 'category',
      data: props.data.map((d) => d.label),
      axisLabel: {
        color: '#e5e7eb',
        fontSize: 12,
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },

    series: [
      {
        type: 'bar',
        barHeight: 14,
        data: props.data.map((d) => ({
          value: d.percentage,
          itemStyle: { color: getColor(d.percentage) },
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#e5e7eb',
        },
      },
    ],
  })

  chart.resize()
}

watch(
  () => props.data,
  (val) => {
    if (val && val.length) {
      renderChart()
    }
  },
  { deep: true },
)

onMounted(() => {
  if (props.data.length) {
    renderChart()
  }
  window.addEventListener('resize', () => chart?.resize())
})

onUnmounted(() => {
  chart?.dispose()
  chart = null
})
</script>
