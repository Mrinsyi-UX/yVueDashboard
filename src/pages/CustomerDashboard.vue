<template>
  <div class="p-4 bg-[#050b2e] min-h-screen space-y-6">
    <!-- TOP 2 × 3 -->
    <div class="grid grid-cols-3 grid-rows-2 gap-4 h-[700px]">
      <NeonCard title="Today Output">
        <GC_OutputToday
          :value="outputGauge.today.output_percentage"
          :status="outputGauge.today.gauge_status"
        />
      </NeonCard>

      <NeonCard>
        <KpiGrid />
      </NeonCard>

      <NeonCard title="Leak Test Defect">
        <HP_Defect :data="filteredDefects" />
      </NeonCard>

      <NeonCard title="Yesterday Output">
        <GC_OutputYesterday
          :value="outputGauge.yesterday.output_percentage"
          :status="outputGauge.yesterday.gauge_status"
        />
      </NeonCard>

      <NeonCard>
        <img src="../images/oil-refinery.png" class="rounded-lg" />
      </NeonCard>

      <NeonCard title="M/C Downtime">
        <HP_Downtime />
      </NeonCard>
    </div>

    <!-- ================= BOTTOM CAROUSEL ================= -->
    <NeonCard title="Production Lines">
      <WorkcellCarousel :workcells="workcells" />
    </NeonCard>
  </div>
</template>

<script setup>
// ---------------- IMPORTS ----------------

// Cards
import NeonCard from '@/components/NeonCard.vue'
import KpiGrid from '@/components/KpiGrid.vue'

// Components
import GC_OutputToday from '@/components/GC_OutputToday.vue'
import GC_OutputYesterday from '@/components/GC_OutputYesterday.vue'
import HP_Defect from '@/components/HP_Defect.vue'
import HP_Downtime from '@/components/HP_Downtime.vue'
import WorkcellCarousel from '@/components/WorkcellCarousel.vue'

// Vue & Services
import { ref, onMounted, onUnmounted, computed } from 'vue'
import api from '@/services/api.js'

// ---------------- TIMER ----------------
console.log('🔥 DASHBOARD PAGE LOADED')

const workcells = ref([])

let timer = null
// ---------------- STATE ----------------

// Output Gauge
const outputGauge = ref({
  today: { output_percentage: 0, gauge_status: 'NO DATA' },
  yesterday: { output_percentage: 0, gauge_status: 'NO DATA' },
})

// Raw defect data
const defectData = ref([])

// ---------------- FETCH FUNCTIONS ----------------

const fetchOutputGauge = async () => {
  console.log('📊 Fetching output gauge...')

  try {
    const res = await api.get('/api/output_gauge')
    outputGauge.value.today = res.data.today
    outputGauge.value.yesterday = res.data.yesterday
    console.log('✅ Output gauge data:', outputGauge.value)
  } catch (err) {
    console.error('Failed to fetch output gauge', err)
    outputGauge.value = {
      today: { output_percentage: 0, gauge_status: 'NO DATA' },
      yesterday: { output_percentage: 0, gauge_status: 'NO DATA' },
    }
  }
}

const fetchDefects = async () => {
  console.log('🐞 Fetching defect data...')

  try {
    const res = await api.get('/api/defect_overall')

    // Expecting { data: [...] }
    defectData.value = Array.isArray(res.data?.data) ? res.data.data : []
    console.log('📦 Raw defectData:', defectData.value.length)
  } catch (err) {
    console.error('Failed to fetch defects', err)
    defectData.value = []
  }
}

const fetchWorkcellSummary = async () => {
  console.log('fetching workcell summary data...')

  try {
    const res = await api.get('/api/workcell_customer_summary')
    workcells.value = res.data
    console.log('📦 Workcell summary data:', workcells.value)
  } catch (err) {
    console.error('Failed to fetch workcell summary', err)
    workcells.value = []
  }
}
// ---------------- CLEAN / NORMALIZE ----------------

const filteredDefects = computed(
  () =>
    defectData.value
      .map((d) => ({
        ...d,

        percentage: Number(d.percentage) || 0, // 🔑 normalize
      }))
      .filter((d) => d.percentage > 0)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 8), // TOP 8
)

// ---------------- LIFECYCLE ----------------

onMounted(() => {
  console.log('🚀 onMounted() triggered')

  fetchOutputGauge()
  fetchDefects()
  fetchWorkcellSummary()

  timer = setInterval(() => {
    fetchOutputGauge()
    fetchDefects()
    fetchWorkcellSummary()
  }, 300000) // 5 min
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>
