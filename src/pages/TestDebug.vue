<template>
  <div class="p-6 text-white">
    <h1 class="text-2xl font-bold mb-4">TEST DEBUG PAGE</h1>

    <p>Status: {{ status }}</p>

    <TestChild />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TestChild from '@/components/TestChild.vue'
import api from '@/services/api.js'

onMounted(async () => {
  console.log('🚀 TestDebug onMounted()')

  try {
    const res = await api.get('/api/defect_overall')
    console.log('✅ API TEST RESPONSE:', res.data)
  } catch (err) {
    console.error('❌ API TEST ERROR:', err)
  }
})
</script>
