<template>
  <div class="neon-panel p-5">
    <h2 class="text-xl font-semibold text-glow-blue mb-3">Defect % (Daily)</h2>
    <div ref="chartRef" class="w-full h-[400px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: Array, // expecting processed data [{name, value}, ...]
})

const chartRef = ref(null)

const renderChart = (data) => {
  const chart = echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: {
      bottom: 0,
      textStyle: { color: '#fff' },
      type: 'scroll',
    },
    series: [
      {
        name: 'Defects',
        type: 'pie',
        radius: ['30%', '65%'],
        label: { color: '#fff', formatter: '{b}: {d}%' },
        itemStyle: {
          borderColor: '#021027',
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: 'rgba(0,186,255,0.5)',
        },
        color: [
          '#00baff',
          '#b100ff',
          '#00ff99',
          '#ffaa00',
          '#ff0077',
          '#00ffff',
          '#ff44ff',
          '#aaff00',
          '#ff6600',
          '#0088ff',
        ],
        data,
      },
    ],
  })
}

onMounted(() => props.data && renderChart(props.data))
watch(
  () => props.data,
  (newData) => newData && renderChart(newData),
)
</script>
