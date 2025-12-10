<script setup>
import * as echarts from "echarts";
import { onMounted, watch, ref } from "vue";

const props = defineProps({
  chart: Object   // expects { hours: [...], series: [...] }
});

const chartRef = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = echarts.init(chartRef.value);
  updateChart();
});

watch(
  () => props.chart,
  () => updateChart(),
  { deep: true }
);

function updateChart() {
  if (!props.chart || !chartInstance) return;

  const option = {
    tooltip: { trigger: "axis" },
    legend: {
              type: "scroll",
              bottom: 0,
              textStyle: { color: "#fff" }
            },

    grid: {
              left: "5%",
              right: "5%",
              top: "20%",
              bottom: "22%"   // more space for long legend
          },

    xAxis: {
      type: "category",
      data: props.chart.hours,
      axisLabel: { color: "#fff" }
    },

    yAxis: {
      type: "value",
      axisLabel: { color: "#fff" }
    },

    series: props.chart.series
  };

  chartInstance.setOption(option);
}
</script>

<template>
  <div ref="chartRef" style="width: 100%; height: 280px;"></div>
</template>
