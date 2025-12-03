<template>
  <div
    class="ganban-card p-5 rounded-xl shadow-lg border border-cyan-400/40 bg-blue-500/10 backdrop-blur-md"
  >
    <h2 class="text-xl font-bold mb-4 text-cyan-300 drop-shadow">
      {{ workcell.name }}
    </h2>

    <div v-for="(s, i) in workcell.stations" :key="i" class="mb-4">
      
      <!-- Station label -->
      <div class="flex flex-wrap items-center gap-2 mb-1">
        <span class="text-white font-semibold text-sm">{{ s.st }}</span>

        <!-- Neon Indicator -->
        <span
          class="h-3 w-3 rounded-full"
          :class="{
            'bg-yellow-400 shadow-[0_0_6px_#facc15]': hasAnomaly(s),
            'bg-gray-400': !hasAnomaly(s)
          }"
        ></span>

        <!-- Anomaly badges -->
        <div class="flex flex-wrap gap-1 text-xs">
          <template v-if="hasAnomaly(s)">
            <!-- Loop through each anomaly event -->
            <template v-for="(an, ai) in s.anomalies.filter(a => a.end === null)" :key="ai">
              <!-- Loop through flags inside the event -->
              <span
                v-for="(flag, fi) in an.anomalies_flag"
                :key="fi"
                class="px-2 py-[1px] rounded bg-yellow-500/20 
                       text-yellow-300 border border-yellow-400/30"
              >
                {{ ANOMALY_MAP[flag] }}
              </span>
            </template>
          </template>

          <template v-else>
            <span class="text-gray-400">No anomaly</span>
          </template>
        </div>
      </div>

      <!-- Timeline Bar -->
      <StationTimeline :station="s" />
    </div>
  </div>
</template>

<script setup>
import StationTimeline from "./StationTimeLine.vue";

defineProps({
  workcell: Object
});

// Mapping of backend flags → readable names
const ANOMALY_MAP = {
  ms_flag: "Material Shortage",
  me_flag: "Mechanical Error",
  mc_flag: "Machine Failure",
  mp_flag: "Missing Parts",
  bt_flag: "Break Time",
  qc_flag: "Quality Issue"
};

// Check if station has ANY anomaly
function hasAnomaly(station) {
  return station.anomalies.some(a =>
    a.anomalies_flag?.length > 0 && a.end === null
  );
}
</script>

<style scoped>
.ganban-card {
  transition: 0.3s ease;
}
.ganban-card:hover {
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.4),
              0 0 40px rgba(0, 255, 255, 0.2);
}
</style>
