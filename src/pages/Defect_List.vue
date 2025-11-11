<template>
  <div class="p-6 bg-[#010a1a] text-white min-h-screen">
    <h1 class="text-2xl font-semibold text-[#00baff] mb-4">📋 Quality Checksheet</h1>
    <ChecksheetHeader :partInfo="partInfo" />
    <DefectTable :defects="defects" :dates="dates" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import ChecksheetHeader from '@/components/ChecksheetHeader.vue'
import DefectTable from '@/components/DefectTable.vue'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000'
const partInfo = ref({})
const defects = ref([])
const dates = ref([])

onMounted(async () => {
  const res = await axios.get(`${API}/api/checksheet`)
  partInfo.value = res.data.part
  defects.value = res.data.defects
  dates.value = Array.from({ length: 30 }, (_, i) => i + 1)
})
</script>
