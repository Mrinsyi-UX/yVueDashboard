<template>
  <div class="neon-panel p-5">
    <h2 class="text-xl font-semibold text-glow-blue mb-3">Defect % ( Daily )</h2>
    <div ref="chartRef" class="w-full h-80"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import * as echarts from 'echarts'

const chartRef = ref(null)
const API = import.meta.env.VITE_API_URL || 'http://10.0.120.216:8000'

// 💾 Fetch defect data from Flask API
const fetchDefectData = async () => {
  const res = await axios.get(`${API}/api/leak_defects`, {
    params: {
      start: '2025-10-01',
      end: '2025-10-31',
    },
  })

  // Group by defect label
  const grouped = {}
  for (const row of res.data) {
    if (row.total_occurrences > 0) {
      grouped[row.defect_or_position] =
        (grouped[row.defect_or_position] || 0) + row.total_occurrences
    }
  }

  const data = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }))

  renderChart(data)
}

// 📊 Render ECharts pie
const renderChart = (data) => {
  const chart = echarts.init(chartRef.value)
  chart.setOption({
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
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
        avoidLabelOverlap: true,
        label: {
          color: '#fff',
          formatter: '{b}: {d}%',
        },
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

onMounted(() => fetchDefectData())
</script>
