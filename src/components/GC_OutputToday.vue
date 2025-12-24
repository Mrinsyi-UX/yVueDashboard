<template>
  <div ref="chartRef" class="w-full h-full"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
})

const getColor = (val) => {
  if (val < 50) return '#ff4d4f'
  if (val < 80) return '#ffd166'
  return '#00ff99'
}

const chartRef = ref(null)
let chart = null

const renderChart = () => {
  if (!chart) {
    chart = echarts.init(chartRef.value)
  }

  chart.setOption({
    backgroundColor: 'transparent',
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '100%',
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.5, '#ff4d4f'], // red
              [0.8, '#ffd166'], // yellow
              [1, '#00ff99'], // green
            ],
          },
        },
        pointer: {
          width: 10,
          length: '50%',
          itemStyle: { color: '#ffffff' },
        },
        axisTick: {
          distance: -10,
          length: 10,
          lineStyle: { color: '#1f3555' },
        },
        splitLine: { show: false, length: 10, lineStyle: { color: '#1f3555' } },
        axisLabel: { show: true, distance: 5, color: '#888888', formatter: '{value}%' },
        detail: {
          fontSize: 26,
          color: getColor(props.value),
          formatter: '{value}%',
          offsetCenter: [0, '30%'],
        },
        data: [{ value: props.value }],
      },
    ],
  })
}

onMounted(renderChart)

watch(
  () => props.value,
  (val) => {
    if (chart) {
      chart.setOption({
        series: [{ data: [{ value: val }] }],
      })
    }
  },
)
</script>
