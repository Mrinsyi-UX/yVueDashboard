<template>
  <div ref="chartRef" style="height: 200px; width: 100%;"></div>
</template>

<script setup>
import * as echarts from "echarts";
import { onMounted, ref, watch, onBeforeUnmount } from "vue";

const props = defineProps({
  chart: Object
});

let chartInstance = null;
const chartRef = ref(null);

const draw = () => {
  if (!props.chart || !props.chart.series) return;

  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value);
  }

  chartInstance.setOption({
    backgroundColor: "transparent",
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: { top: 0, textStyle: { color: "#aee6ff" } },
    grid: { left: 40, right: 20, top: 40, bottom: 30 },
    xAxis: {
      type: "category",
      data: props.chart.hours,
      axisLabel: { color: "#aee6ff" }
    },
    yAxis: { type: "value", axisLabel: { color: "#aee6ff" } },
    series: props.chart.series
  });

  chartInstance.resize();
};

onMounted(() => {
  draw();
  window.addEventListener("resize", handleResize);
});

const handleResize = () => {
  if (chartInstance) chartInstance.resize();
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(() => props.chart, draw, { deep: true });
</script>
