<template>
  <OEEOverallCard>
    <h2 class="text-xl font-semibold text-[#00eaff] mb-2">OEE — Last 30 Days</h2>

    <!-- Bar chart -->
    <div ref="chartRef" class="h-56 w-full"></div>
  </OEEOverallCard>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import OEEOverallCard from './OEEOverallCard.vue'
import api from '../services/api.js'

const chartRef = ref(null)
let chart = null

const days = ref([])
const oeeData = ref([])
const availabilityData = ref([])
const performanceData = ref([])
const qualityData = ref([])

const fetchOEE = async () => {
  const res = await api.get('/api/oee/OEE_BC_30days')

  const data = res.data

  days.value = data.map((d) =>
    d.production_date
      ? new Date(d.production_date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        })
      : '',
  )

  availabilityData.value = data.map((d) => d.availability)
  performanceData.value = data.map((d) => d.performance)
  qualityData.value = data.map((d) => d.quality)
  oeeData.value = data.map((d) => d.oee)
}

onMounted(async () => {
  chart = echarts.init(chartRef.value)

  await fetchOEE()

  chart.setOption({
    backgroundColor: 'transparent',

    legend: {
      top: 0,
      textStyle: {
        color: '#cbd5e1',
        fontSize: 11,
      },
    },

    grid: {
      left: 40,
      right: 20,
      top: 40, // ⬅ make room for legend
      bottom: 40,
    },

    xAxis: {
      type: 'category',
      data: days.value,
      axisLine: { lineStyle: { color: '#445' } },
      axisTick: { show: false },
      axisLabel: { color: '#aaa', fontSize: 10 },
    },

    yAxis: {
      type: 'value',
      min: 0,
      max: 300,
      splitLine: {
        lineStyle: { color: '#1f3555', type: 'dashed' },
      },
      axisLabel: { color: '#aaa' },
    },

    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        if (!params || params.length === 0) return ''

        const hasData = params.some((p) => p.value != null)
        if (!hasData) return 'No Production'

        return params
          .filter((p) => p.value != null)
          .map((p) => `${p.marker} ${p.seriesName}: ${p.value}%`)
          .join('<br/>')
      },
    },

    series: [
      {
        name: 'Availability',
        type: 'bar',
        stack: 'total',
        data: availabilityData.value,
        itemStyle: { color: '#7cffc4' },
        barWidth: '60%',
      },
      {
        name: 'Performance',
        type: 'bar',
        stack: 'total',
        data: performanceData.value,
        itemStyle: { color: '#ffd166' },
      },
      {
        name: 'Quality',
        type: 'bar',
        stack: 'total',
        data: qualityData.value,
        itemStyle: { color: '#89CFF0' },
      },
      {
        name: 'OEE',
        type: 'line',
        data: oeeData.value,
        connectNulls: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          color: '#00eaff',
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
