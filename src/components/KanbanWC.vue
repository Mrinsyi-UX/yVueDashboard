<template>
  <div class="kanban-card min-w-[360px] h-[200px]">
    <!-- TITLE -->
    <h3 class="text-cyan-300 font-semibold mb-2">
      {{ title }}
    </h3>

    <!-- CONTENT -->
    <div class="grid grid-cols-[120px_1fr] gap-3 h-full">
      <!-- LEFT: IMAGE -->
      <div class="wc-image">
        <img :src="image" alt="workcell" />
      </div>

      <!-- RIGHT: KPI STACK -->
      <div class="flex flex-col justify-between text-xs text-slate-300">
        <div>
          <p class="text-slate-400">Online M/C</p>
          <p class="text-lg font-bold text-green-400">{{ online }} / {{ total }}</p>
        </div>

        <div>
          <p class="text-slate-400">Run Time</p>
          <p class="text-lg font-bold text-cyan-300">
            {{ runtime }}
          </p>
        </div>

        <div>
          <p class="text-slate-400">Down Time</p>
          <p class="text-lg font-bold text-red-400">
            {{ downtime }}
          </p>
        </div>

        <div>
          <p class="text-slate-400">M/C Output</p>
          <p class="text-lg font-bold text-green-400">
            {{ output }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  online: Number,
  total: Number,
  runtime: String,
  downtime: String,
  output: Number,
  image: {
    type: String,
    default: '/placeholder.png',
  },
})
</script>

<style scoped>
.kanban-card {
  background: linear-gradient(180deg, #0b1d4d, #050b2e);
  border: 1px solid #7cffc4;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 0 16px rgba(124, 255, 196, 0.3);
}
</style>
