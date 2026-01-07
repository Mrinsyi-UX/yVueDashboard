<script setup>
import * as echarts from 'echarts'
import { onMounted, watch, ref } from 'vue'

const props = defineProps({
  hours: {
    type: Array,
    required: true,
  },
  series: {
    type: Array,
    required: true,
  },
})

const chartRef = ref(null)
let chartInstance = null

onMounted(() => {
  chartInstance = echarts.init(chartRef.value)
  updateChart()
})

// Watch both props
watch(
  () => [props.hours, props.series],
  () => updateChart(),
  { deep: true },
)

function updateChart() {
  if (!chartInstance || !props.hours || !props.series) return

  const option = {
    backgroundColor: 'transparent',

    tooltip: { trigger: 'axis' },

    title: {
      text: 'Hourly Cycle Time with ΔCT',
      left: 'center',
      textStyle: { color: '#fff' },
    },

    legend: {
      type: 'scroll',
      bottom: 0,
      textStyle: { color: '#fff' },
    },

    grid: {
      left: '0%',
      right: '0%',
      top: '20%',
      bottom: '12%',
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      data: props.hours,
      axisLabel: { color: '#fff' },
    },

    yAxis: [
      {
        type: 'value',
        name: 'Cycle Time (s)',
        axisLabel: { color: '#fff' },
      },
      {
        type: 'value',
        name: 'Δ Cycle Time (s)',
        axisLabel: { color: '#ffd166' },
        splitLine: { show: false },
      },
    ],

    lineStyle: {
      color: (value) => (value > 0 ? '#ef4444' : '#22c55e'),
    },

    series: props.series,
  }

  chartInstance.setOption(option, true)
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 480px"></div>
</template>
