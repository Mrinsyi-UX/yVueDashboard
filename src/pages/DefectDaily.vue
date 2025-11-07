<template>
  <div class="space-y-6 p-6" style="overflow: visible !important;">
    <DefectPieChart :data="chartData" />
    <ParetoChart :data="chartData" />
    <LeakHourlyChart style="overflow: visible !important;" />
    <DefectYieldChart />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import DefectPieChart from "../components/DefectPieChart.vue";
import ParetoChart from "../components/ParetoChart.vue";
import DefectYieldChart from "../components/DefectYieldChart.vue";
import LeakHourlyChart from "@/components/LeakHourlyChart.vue";

const chartData = ref([]);
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

const fetchData = async () => {
  const res = await axios.get(`${API}/api/leak_defects`, {
    params: { start: "2025-10-01", end: "2025-10-31" },
  });
  const grouped = {};
  for (const row of res.data) {
    if (row.total_occurrences > 0) {
      grouped[row.defect_or_position] =
        (grouped[row.defect_or_position] || 0) + row.total_occurrences;
    }
  }
  chartData.value = Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
};

onMounted(fetchData);
</script>
