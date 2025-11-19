<template>
  <div class="p-6">
    <div class="bg-white p-5 rounded shadow w-[400px]">
      <StationTimeline
        v-for="(s, i) in stations"
        :key="i"
        :station="s"
      />
    </div>
  </div>
</template>

<script setup>
import StationTimeline from "../components/StationTimeline.vue";

const stations = [
  {
    st: "ST1",
    running_start: "2025-11-18T08:20:00",
    running_end: null,
    anomalies: [
      { start: "2025-11-18T10:15:00", end: "2025-11-18T10:30:00" }
    ]
  },
  {
    st: "ST2",
    running_start: null,
    anomalies: []
  },
  {
    st: "ST3",
    running_start: "2025-11-18T09:10:00",
    running_end: null,
    anomalies: []
  }
];
</script>
