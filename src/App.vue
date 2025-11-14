<template>
  <div class="min-h-screen bg-[#010a1a] text-white">
    <!-- 🔹 Top Navigation -->
    <nav class="flex justify-center gap-6 py-4 border-b border-[#00baff44]">
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/')"
      >
        🏠 Dashboard
      </RouterLink>

      <RouterLink
        to="/defects"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/defects')"
      >
        ⚙️ Defect Analysis
      </RouterLink>

      <RouterLink
        to="/defect_list"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/defect_list')"
      >
        📋 Quality Checksheet
      </RouterLink>

      <RouterLink
        to="/workcell"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/workcell')"
      >
        📋 Workcell Dashboard
      </RouterLink>
    </nav>

    <!-- 🔹 Page Content -->
    <router-view class="p-6"></router-view>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const isActive = (path) => {
  return route.path === path
    ? 'bg-[#031739] text-[#00baff] shadow-[0_0_10px_#00baff]'
    : 'hover:text-[#00baff]'
}
</script>
