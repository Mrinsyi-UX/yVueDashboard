<template>
  <div class="neon-panel p-5">
    <h2 class="text-xl font-semibold text-glow-blue mb-3">Yield & FPY (Daily - 30 Days)</h2>
    <div ref="chartRef" class="w-full h-[500px]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chart
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const fetchData = async () => {
  const res = await axios.get(`${API}/api/defect_yield`)
  const data = res.data

  const dates = data.map((d) => d.date)
  const defects = data.map((d) => d.total_defect)
  const outputs = data.map((d) => d.total_output)
  const yieldRate = data.map((d) => d.yield_rate)
  const fpyRate = data.map((d) => d.fpy_rate)
  //const defectRate = data.map((d) => d.defect_rate)

  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const [bar] = params
        const i = bar.dataIndex
        return `
          <div>
            <strong>${bar.axisValue}</strong><br/>
            Output: ${outputs[i]}<br/>
            Defects: ${defects[i]}<br/>
            Yield: ${yieldRate[i]}%<br/>
            FPY: ${fpyRate[i]}%
          </div>`
      },
    },
    legend: {
      data: ['Defect Qty', 'Yield %', 'FPY %'],
      textStyle: { color: '#fff' },
    },
    grid: { left: '8%', right: '8%', bottom: '10%', top: '10%' },
    xAxis: {
      type: 'category',
      data: dates,
      axisLabel: { color: '#fff', rotate: 40 },
      axisLine: { lineStyle: { color: '#00baff' } },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Defect Qty',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#ff66ff' } },
        splitLine: { lineStyle: { color: '#033a63' } },
      },
      {
        type: 'value',
        name: 'Rate (%)',
        min: 0,
        max: 100,
        position: 'right',
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: '#00ff99' } },
        splitLine: { show: false },
      },
    ],
    series: [
      {
        name: 'Defect Qty',
        type: 'bar',
        yAxisIndex: 0,
        data: defects,
        barWidth: '45%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#b100ff' },
            { offset: 1, color: '#021027' },
          ]),
        },
      },
      {
        name: 'Yield %',
        type: 'line',
        yAxisIndex: 1,
        data: yieldRate,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00ff99', width: 2 },
        itemStyle: { color: '#00ff99' },
      },
      {
        name: 'FPY %',
        type: 'line',
        yAxisIndex: 1,
        data: fpyRate,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00ffff', width: 2 },
        itemStyle: { color: '#00ffff' },
      },
    ],
  })
}

onMounted(() => {
  chart = echarts.init(chartRef.value)
  fetchData()
  window.addEventListener('resize', () => chart.resize())
})

onUnmounted(() => {
  if (chart) chart.dispose()
})
</script>
