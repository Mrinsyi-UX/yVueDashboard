<template>
  <div class="p-5">
    <h1 class="text-3xl font-bold mb-6 text-white">Workcell High Level Machine Status</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <WorkcellCard v-for="cell in workcells" :key="cell.id" :cell="cell" />
    </div>
  </div>
</template>

<script setup>
import WorkcellCard from '../components/WorkcellCard.vue'

const workcells = [
  {
    id: 1,
    name: 'WC 1',
    status: 'Running',
    output: 10,
    time: '+00:00 (hh:mm)',
    cycleTime: '',
    runTime: 0,
  },
  {
    id: 2,
    name: 'WC 2',
    status: 'No Material',
    output: 10,
    time: '+00:00 (hh:mm)',
  },
  {
    id: 3,
    name: 'WC 3',
    status: 'No Man Power',
    output: 10,
    time: '+00:00 (hh:mm)',
  },
  {
    id: 4,
    name: 'WC 4',
    status: 'Machine Error',
    output: 10,
    time: '+00:00 (hh:mm)',
  },
  {
    id: 5,
    name: 'WC 5',
    status: 'Running',
  },
  {
    id: 6,
    name: 'WC 6',
    status: 'Running',
  },
  {
    id: 7,
    name: 'WC 7',
    status: 'Quality Issue',
  },
  {
    id: 8,
    name: 'Sand Blast',
    status: 'Running',
  },
  {
    id: 9,
    name: 'Painting',
    status: 'Running',
  },
  {
    id: 10,
    name: 'ED Line',
    status: 'Machine Setup',
  },
]
</script>
