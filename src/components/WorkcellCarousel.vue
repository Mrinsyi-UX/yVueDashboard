<template>
  <div class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
    <WorkcellCard v-for="wc in workcells" :key="wc.workcell_id" :wc="wc" class="min-w-[460px]" />
  </div>
</template>

<script setup>
import WorkcellCard from './WorkcellCardCustomer.vue'

// Props is needed to receive data from parent, parent does not pass but it is fetched by the child
defineProps({
  workcells: {
    type: Array,
    required: true,
  },
})
</script>
