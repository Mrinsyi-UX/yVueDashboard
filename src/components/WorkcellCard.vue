<template>
  <div
    class="workcell-card p-4 rounded-lg shadow text-white backdrop-blur-sm"
    :style="{ backgroundColor: cardColor }"
  >
    <h2 class="text-xl font-bold mb-2">{{ cell.name }}</h2>

    <p>Status : {{ cell.status }}</p>
    <p>WIP : {{ cell.IssueMaterial - cell.MinCycleOutput }}</p>
    <p>Target Output : {{ cell.Target }}</p>
    <p>Current Output : {{ cell.MinCycleOutput }}</p>
    <p>Cycle Time : {{ cell.AvgCycleTime }} second</p>
    <p>Runtime: {{ cell.runtimePercentage }}%</p>

    <p class="mt-2 font-bold"></p>
    <p>Output Status:{{ cell.expectedOutput }} pcs</p>
    <p>Pieces x Cycle Time</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cell: Object,
})

// Compute card color
const cardColor = computed(() => {
  switch (props.cell.status) {
    case 'Running':
      return 'rgba(0,153,51,0.7)'
    case 'Issue':
      return 'rgba(244,241,192,0.7)'
    case 'No Man Power':
      return 'rgba(240,228,0,0.7)'
    case 'Machine Error':
      return 'rgba(255,26,26,0.7)'
    case 'Quality Issue':
      return 'rgba(255,204,153,0.7)'
    case 'Machine Setup':
      return 'rgba(0,153,255,0.7)'
    default:
      return 'rgba(51,51,51,0.7)'
  }
})
</script>

<style scoped>
div {
  min-height: 220px;
}
</style>
