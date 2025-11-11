<template>
  <div class="checksheet-header text-black bg-white p-4 rounded shadow">
    <h2 class="text-xl font-bold text-center mb-2">QUALITY CHECKSHEET</h2>

    <div class="grid grid-cols-2 gap-4">
      <!-- Part info -->
      <div>
        <table class="text-sm w-full border border-gray-400">
          <tr>
            <td class="font-bold w-32">Part Name:</td>
            <td>{{ partInfo.part_name }}</td>
          </tr>
          <tr>
            <td class="font-bold">Part Number:</td>
            <td>{{ partInfo.part_number }}</td>
          </tr>
          <tr>
            <td class="font-bold">Process:</td>
            <td>{{ partInfo.process }}</td>
          </tr>
          <tr>
            <td class="font-bold">Month:</td>
            <td>{{ partInfo.month }}</td>
          </tr>
        </table>
      </div>

      <!-- Images -->
      <div class="flex gap-3">
        <div class="relative border border-gray-400">
          <img :src="partInfo.image1 || '/muffler.jpg'" class="max-h-40 object-contain" />
          <!-- Example overlay labels -->
          <div
            v-for="n in 10"
            :key="n"
            class="absolute text-xs bg-red-600 text-white px-1 rounded"
            :style="{ top: `${10 + n * 12}px`, left: `${5 + n * 5}px` }"
          >
            M{{ n }}
          </div>
        </div>
        <div class="relative border border-gray-400">
          <img :src="partInfo.image2 || '/fixture.jpg'" class="max-h-40 object-contain" />
          <div
            v-for="n in 5"
            :key="n"
            class="absolute text-xs bg-green-600 text-white px-1 rounded"
            :style="{ top: `${8 + n * 15}px`, left: `${10 + n * 10}px` }"
          >
            G{{ n }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  partInfo: {
    type: Object,
    default: () => ({
      part_name: 'Muffler Comp Exhaust',
      part_number: '18300-K2P-M011',
      process: 'Leaking Test / Inspection',
      month: 'Oct 2025',
      image1: '',
      image2: '',
    }),
  },
})
</script>

<style scoped>
.checksheet-header {
  font-family: Arial, sans-serif;
}
</style>
