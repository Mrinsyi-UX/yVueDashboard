<template>
  <div class="neon-panel p-5">
    <h2 class="text-xl font-semibold text-glow-blue mb-3">Pareto (Live)</h2>
    <div ref="chartRef" class="w-full h-[500px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: Array, // same processed data [{name, value}, ...]
})

const chartRef = ref(null)

const renderChart = (data) => {
  const sorted = [...data].sort((a, b) => b.value - a.value)
  const total = sorted.reduce((sum, d) => sum + d.value, 0)
  let cumulative = 0
  const cumPercent = sorted.map((d) => {
    cumulative += d.value
    return ((cumulative / total) * 100).toFixed(1)
  })

  const chart = echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', axisPointer: { type: 'cross' } },
    grid: { left: '8%', right: '8%', bottom: '10%', top: '10%' },
    xAxis: [
      {
        type: 'category',
        data: sorted.map((d) => d.name),
        axisLabel: { color: '#fff', rotate: 40 },
        axisLine: { lineStyle: { color: '#00baff' } },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: 'Defect Count',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#00baff' } },
        splitLine: { lineStyle: { color: '#033a63' } },
      },
      {
        type: 'value',
        name: 'Cumulative %',
        min: 0,
        max: 100,
        position: 'right',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#ff66ff' } },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Defect Count',
        type: 'bar',
        data: sorted.map((d) => d.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#b100ff' },
            { offset: 1, color: '#021027' },
          ]),
        },
        barWidth: '45%',
      },
      {
        name: 'Cumulative %',
        type: 'line',
        yAxisIndex: 1,
        data: cumPercent,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00ffff', width: 2 },
        itemStyle: { color: '#00ffff' },
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
