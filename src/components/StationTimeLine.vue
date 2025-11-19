<template>
  <div class="mb-4">
    <div class="text-sm font-semibold mb-1">{{ station.st }}</div>

    <div class="relative w-full h-3 bg-gray-300 rounded overflow-hidden">

      <!-- 🟩 Running Time -->
      <div
        v-if="runningWidth > 0"
        class="absolute top-0 h-3 bg-green-500"
        :style="{ left: runningLeft, width: runningWidth }"
      ></div>

      <!-- 🟥 Anomaly Segments -->
      <div
        v-for="(a, i) in anomalyBars"
        :key="i"
        class="absolute top-0 h-3 bg-red-500"
        :style="{ left: a.left, width: a.width }"
      ></div>

    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";

const props = defineProps({
  station: Object
});

// ---- Working Hours ----
const WORK_START = dayjs().hour(8).minute(0).second(0);
const WORK_END = dayjs().hour(17).minute(45).second(0);
const TOTAL_MIN = WORK_END.diff(WORK_START, "minute");

// ---- Convert time → % string ----
const toPercent = (min) => `${(min / TOTAL_MIN) * 100}%`;

// ---- Running time bar ----
let runningLeft = "0%";
let runningWidth = "0%";

if (props.station.running_start) {
  const runStart = dayjs(props.station.running_start);
  const runEnd = props.station.running_end
    ? dayjs(props.station.running_end)
    : dayjs(); // running until now

  const leftMin = Math.max(0, runStart.diff(WORK_START, "minute"));
  const rightMin = Math.min(
    TOTAL_MIN,
    runEnd.diff(WORK_START, "minute")
  );

  runningLeft = toPercent(leftMin);
  runningWidth = toPercent(rightMin - leftMin);
}

// ---- Anomaly segments ----
let anomalyBars = [];

if (props.station.anomalies) {
  anomalyBars = props.station.anomalies.map(a => {
    const aStart = dayjs(a.start);
    const aEnd = dayjs(a.end);

    const leftMin = Math.max(0, aStart.diff(WORK_START, "minute"));
    const rightMin = Math.min(
      TOTAL_MIN,
      aEnd.diff(WORK_START, "minute")
    );

    return {
      left: toPercent(leftMin),
      width: toPercent(rightMin - leftMin)
    };
  });
}
</script>

<style scoped>
/* You can customize colors here if needed */
</style>
