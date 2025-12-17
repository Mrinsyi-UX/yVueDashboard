<template>
  <div class="min-h-screen bg-[#010a1a] p-6 text-white">

    <h1 class="text-3xl font-bold mb-8 text-center text-[#00baff] tracking-wide">
      OEE Dashboard
    </h1>

    <!-- 3x3 GRID -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      <!-- ROW 1 -->
      <OEEYearCard />
      <OEE30DaysCard />
      <OEEBarChart30days />

      <!-- ROW 2 -->
      <DowntimeBC7Days />
      <DowntimeBC30days />
      <OEEBC12month />

    </div>

  </div>
</template>

<script setup>
import OEEYearCard from "../components/OEEYearCard.vue";
import OEE30DaysCard from "../components/OEE30daysCard.vue";
import OEEBarChart30days from "../components/OEEBarChart30days.vue";
import DowntimeBC7Days from "../components/DowntimeBC7days.vue";
import DowntimeBC30days from "@/components/DowntimeBC30days.vue";
import OEEBC12month from "@/components/OEEBC12month.vue";

</script>
