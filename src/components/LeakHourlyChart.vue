<template>
  <div class="neon-panel p-5">
    <h2 class="text-xl font-semibold text-glow-blue mb-3">
      Hourly Yield & FPY (8AM – 8PM)
    </h2>

    <!-- 🔹 Date Selector -->
    <div class="flex items-center gap-3 mb-4">
      <label class="text-white text-sm">Date:</label>
      <input
        type="date"
        v-model="targetDate"
        class="bg-[#021027] text-white rounded px-2 py-1 border border-[#00baff]"
        @change="fetchData"
      />
      <button
        @click="fetchData"
        class="px-3 py-1 bg-[#00baff] text-black font-semibold rounded hover:bg-[#33ccff]"
      >
        Refresh
      </button>
    </div>

    <!-- ✅ Added position-relative to allow tooltip positioning -->
    <div ref="chartRef" class="w-full h-[500px]" style="position: relative; overflow: visible;"></div>
    
    <!-- 🔍 DEBUG: Test if tooltip rendering works at all -->
    <div class="mt-4 p-3 bg-yellow-900/50 border border-yellow-500 rounded text-yellow-200 text-sm">
      <strong>Debug Info:</strong> Hover over the chart. If you see crosshair lines but no tooltip box, 
      the tooltip is being rendered but hidden. Check browser DevTools → Elements for "echarts-tooltip" class.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import axios from "axios";
import * as echarts from "echarts";

const chartRef = ref(null);
const chartInstance = ref(null);
const API = import.meta.env.VITE_API_URL || "http://localhost:8000";
const stationId = ref(10);

// Default = today (YYYY-MM-DD)
//const targetDate = ref(new Date().toISOString().split("T")[0]);
const targetDate = ref("2025-10-29"); // Hardcoded for demo (29/10/2025)

let refreshTimer = null;

const fetchData = async () => {
  try {
    const res = await axios.get(`${API}/api/leak_hourly`, {
      params: {
        station_id: stationId.value,
        date: targetDate.value,
      },
    });

    const data = res.data;
    if (!data || data.length === 0) {
      console.warn("No hourly data found");
      return;
    }

    const hours = data.map((d) => d.hour_label);
    const defects = data.map((d) => d.total_defect);
    const outputs = data.map((d) => d.total_output);
    const yieldRate = data.map((d) => d.yield_rate);
    const fpyRate = data.map((d) => d.fpy_rate);

   if (chartInstance.value) chartInstance.value.dispose();
    chartInstance.value = echarts.init(chartRef.value);

    chartInstance.value.setOption({
      backgroundColor: "transparent",
      tooltip: {
        show: true,  // ✅ Explicitly enable
        trigger: "axis",
        backgroundColor: "rgba(0, 30, 60, 0.95)",
        borderColor: "#00baff",
        borderWidth: 2,
        textStyle: { 
          color: "#fff", 
          fontSize: 14,
          fontWeight: "normal"
        },
        padding: [10, 15],
        axisPointer: {
          show: true,  // ✅ Explicitly enable
          type: "cross",
          crossStyle: {
            color: "#00baff",
            width: 1,
            type: "dashed"
          },
          lineStyle: {
            color: "#00baff",
            width: 1,
            type: "dashed"
          }
        },
        // ✅ CRITICAL: Render tooltip outside chart container
        appendToBody: true,
        confine: false,
        extraCssText: "z-index: 99999; pointer-events: none;",  // ✅ Force high z-index
        formatter: (params) => {
          if (!params || params.length === 0) return "";
          
          const hourLabel = params[0].axisValue;
          const i = params[0].dataIndex;

          // ✅ format full date/time (local Malaysia time)
          const localTime = new Date(`${targetDate.value}T${hourLabel}:00+08:00`);
          const dateString = localTime.toLocaleString("en-GB", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Kuala_Lumpur",
            hour12: false,
          });

          return `
            <div style="line-height: 1.8; min-width: 200px;">
              <strong style="color: #00baff; font-size: 15px;">${dateString} MYT</strong><br/>
              <span style="color: #fff;">Output: <strong>${outputs[i]}</strong></span><br/>
              <span style="color: #ff66ff;">Defects: <strong>${defects[i]}</strong></span><br/>
              <span style="color: #00ff99;">Yield: <strong>${yieldRate[i]}%</strong></span><br/>
              <span style="color: #00ffff;">FPY: <strong>${fpyRate[i]}%</strong></span>
            </div>`;
        },
      },
      legend: {
        data: ["Defect Qty", "Yield %", "FPY %"],
        textStyle: { color: "#fff" },
        top: 10
      },
      grid: { 
        left: "8%", 
        right: "8%", 
        bottom: "12%", 
        top: "15%",
        containLabel: true
      },
      xAxis: {
        type: "category",
        data: hours,
        axisLabel: { 
          color: "#fff",
          fontSize: 12
        },
        axisLine: { lineStyle: { color: "#00baff" } },
      },
      yAxis: [
        {
          type: "value",
          name: "Defect Qty",
          nameTextStyle: { color: "#ff66ff" },
          axisLabel: { color: "#fff" },
          axisLine: { lineStyle: { color: "#ff66ff" } },
          splitLine: { lineStyle: { color: "#033a63" } },
        },
        {
          type: "value",
          name: "Rate (%)",
          min: 0,
          max: 100,
          position: "right",
          nameTextStyle: { color: "#00ff99" },
          axisLabel: { color: "#fff" },
          axisLine: { lineStyle: { color: "#00ff99" } },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: "Defect Qty",
          type: "bar",
          yAxisIndex: 0,
          data: defects,
          barWidth: "45%",
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#b100ff" },
              { offset: 1, color: "#021027" },
            ]),
          },
        },
        {
          name: "Yield %",
          type: "line",
          yAxisIndex: 1,
          data: yieldRate,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#00ff99", width: 3 },
          itemStyle: { color: "#00ff99" },
        },
        {
          name: "FPY %",
          type: "line",
          yAxisIndex: 1,
          data: fpyRate,
          smooth: true,
          symbol: "circle",
          symbolSize: 8,
          lineStyle: { color: "#00ffff", width: 3 },
          itemStyle: { color: "#00ffff" },
        },
      ],
    });

    // ✅ Force resize to ensure proper rendering
    chartInstance.value.resize();
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

onMounted(() => {
  fetchData();

  // 🔁 Auto refresh every 60s (only for today's date)
  refreshTimer = setInterval(() => {
    if (targetDate.value === new Date().toISOString().split("T")[0]) {
      fetchData();
    }
  }, 60000);

  // ✅ Handle window resize
  window.addEventListener('resize', () => {
    if (chartInstance.value) {
      chartInstance.value.resize();
    }
  });
});

onBeforeUnmount(() => {
  if (refreshTimer) clearInterval(refreshTimer);
  if (chartInstance.value) chartInstance.value.dispose();
  window.removeEventListener('resize', () => {});
});
</script>

<style>
/* ✅ NOT scoped - apply globally to fix tooltip */
.neon-panel {
  overflow: visible !important;
  position: relative;
  z-index: 1;
}

/* ✅ Force ECharts tooltip to be visible */
div[class*="echarts-tooltip"] {
  z-index: 999999 !important;
  pointer-events: none !important;
  display: block !important;
}

/* ✅ Fix parent containers that might clip tooltip */
.space-y-6 {
  overflow: visible !important;
}
</style>