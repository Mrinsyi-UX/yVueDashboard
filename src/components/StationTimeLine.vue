<template>
  <div>
    <div class="flex h-4 w-full border border-cyan-300/40 rounded-md overflow-hidden bg-gray-300/20">
      
      <!-- Render timeline segments in correct sequence -->
      <div 
        v-for="(seg, i) in timeline" 
        :key="i"
        :class="segmentClass(seg.type)"
        :style="{ width: seg.width + '%' }"
      ></div>

    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  station: Object
});

// Helper — minutes difference
function minutesBetween(a, b) {
  return (new Date(b) - new Date(a)) / 60000;
}

// CSS Class for each segment type
function segmentClass(type) {
  return {
    running: "bg-green-500 shadow-[0_0_8px_#22c55e]",
    anomaly: "bg-yellow-400 shadow-[0_0_8px_#facc15]",
    future: "bg-gray-500/30"
  }[type];
}

/* Total shift length */
const totalShiftMinutes = computed(() =>
  minutesBetween(props.station.shift_start, props.station.shift_end)
);

/* FINAL ordered timeline array */
const timeline = computed(() => {
  const result = [];

  let cursor = new Date(props.station.shift_start);
  const currTime = new Date(props.station.current_time);
  const shiftEnd = new Date(props.station.shift_end);

  // Sort anomalies by start time (safety)
  const anomalies = [...props.station.anomalies].sort(
    (a, b) => new Date(a.start) - new Date(b.start)
  );

  for (let a of anomalies) {
    const start = new Date(a.start);
    const end = new Date(a.end ?? props.station.current_time);

    // Add running segment BEFORE anomaly
    if (cursor < start) {
      result.push({
        type: "running",
        width: (minutesBetween(cursor, start) / totalShiftMinutes.value) * 100
      });
    }

    // Add anomaly segment
    result.push({
      type: "anomaly",
      width: (minutesBetween(start, end) / totalShiftMinutes.value) * 100
    });

    cursor = end;
  }

  // After last anomaly: running until current time
  if (cursor < currTime) {
    result.push({
      type: "running",
      width: (minutesBetween(cursor, currTime) / totalShiftMinutes.value) * 100
    });
  }

  // Future segment until shift_end
  if (currTime < shiftEnd) {
    result.push({
      type: "future",
      width: (minutesBetween(currTime, shiftEnd) / totalShiftMinutes.value) * 100
    });
  }

  return result;
});
</script>
