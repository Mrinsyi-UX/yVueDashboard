<template>
  <div class="h-full flex flex-col justify-between text-white">
    <!-- 🔹 DATE HEADER -->
    <div class="border-b border-cyan-500/40 pb-2 mb-2">
      <p class="text-xs text-slate-400">Date</p>
      <p class="text-lg font-semibold">2025-04-22</p>
    </div>

    <!-- 🔹 PRIMARY KPIs -->
    <div class="grid grid-cols-2 gap-4 text-center mb-2">
      <div class="kpi-box">
        <p class="kpi-label">Shipped Qty</p>
        <p class="kpi-value text-cyan-400">15,233</p>
      </div>

      <div class="kpi-box">
        <p class="kpi-label">Produced Qty</p>
        <p class="kpi-value text-green-400">8,544</p>
      </div>
    </div>

    <!-- 🔹 OPERATIONAL KPIs -->
    <div class="grid grid-cols-2 gap-4 text-center">
      <div class="kpi-box">
        <p class="kpi-label">Attendance</p>
        <p class="kpi-value text-yellow-400">155</p>
      </div>

      <div class="kpi-box">
        <p class="kpi-label">Machine Status</p>
        <p class="text-sm">
          <span class="text-green-400 font-semibold">18</span>
          <span class="text-slate-400"> / 22</span>
          &nbsp;
          <span class="text-red-400">(4 Offline)</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kpi-box {
  background: rgba(0, 234, 255, 0.06);
  border: 1px solid rgba(0, 234, 255, 0.25);
  border-radius: 10px;
  padding: 10px;
}

.kpi-label {
  font-size: 11px;
  color: #94a3b8;
}

.kpi-value {
  font-size: 22px;
  font-weight: 700;
}
</style>
