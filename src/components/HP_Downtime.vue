<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { name: 'Machine Down', value: 43.3 },
      { name: 'Break', value: 4.0 },
      { name: 'Network', value: 10.5 },
    ],
  },
})

const chartRef = ref(null)
let chart

const getColor = (val) => {
  if (val >= 30) return '#ff4d4f' // red
  if (val >= 10) return '#ffd166' // yellow
  return '#00ff99' // green
}

const renderChart = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value)
  }

  chart.setOption({
    backgroundColor: 'transparent',
    grid: {
      left: 30,
      right: 30, // 🔑 IMPORTANT
      top: 10,
      bottom: 50,
      containLabel: true, // 🔑 VERY IMPORTANT
    },

    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        color: '#94a3b8',
        formatter: '{value}%',
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(148,163,184,0.15)',
          type: 'dashed',
        },
      },
    },

    yAxis: {
      type: 'category',
      data: props.data.map((d) => d.name),
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
        barHeight: 12,
        data: props.data.map((d) => ({
          value: d.value,
          itemStyle: {
            color: getColor(d.value),
          },
        })),
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: '#e5e7eb',
          fontSize: 12,
        },
      },
    ],
  })
}

onMounted(() => {
  renderChart()
  window.addEventListener('resize', () => chart?.resize())
})

watch(() => props.data, renderChart, { deep: true })
</script>
