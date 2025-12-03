<template>
  <div class="min-h-screen bg-[#010a1a] text-white">
    <!-- 🔹 Top Navigation -->
    <nav class="flex justify-center gap-6 py-4 border-b border-[#00baff44] relative">

      <!-- 🏠 Dashboard -->
      <RouterLink
        to="/"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/')"
      >
        🏠 Dashboard
      </RouterLink>

      <!-- ⚙️ Defect Analysis -->
      <RouterLink
        to="/defects"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/defects')"
      >
        ⚙️ Defect Analysis
      </RouterLink>

      <!-- 📋 Quality Checksheet -->
      <RouterLink
        to="/defect_list"
        class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300"
        :class="isActive('/defect_list')"
      >
        📋 Quality Checksheet
      </RouterLink>

      <!-- 📦 Workcell (Dropdown) -->
      <div
        class="relative workcell-dropdown-parent"
        @click.stop="toggleDropdown"
      >
        <button
          class="px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center gap-2"
          :class="isActiveGroup(['/workcell', '/workcellstation'])"
        >
          📦 Workcell
          <span :class="open ? 'rotate-180' : ''" class="transition-transform">▼</span>
        </button>

        <!-- Dropdown Menu -->
        <div
          v-if="open"
          class="absolute left-0 mt-2 w-52 bg-[#031739] border border-[#00baff44] rounded-lg shadow-xl z-50"
        >
          <RouterLink
            to="/workcell"
            class="block px-4 py-2 hover:bg-[#021027] rounded-lg transition-all duration-300"
            :class="isActive('/workcell')"
            @click="closeDropdown"
          >
            📋 Workcell Dashboard
          </RouterLink>

          <RouterLink
            to="/workcellstation"
            class="block px-4 py-2 hover:bg-[#021027] rounded-lg transition-all duration-300"
            :class="isActive('/workcellstation')"
            @click="closeDropdown"
          >
            📋 Workcell Station
          </RouterLink>

          <RouterLink
            to="/workcellzonestation"
            class="block px-4 py-2 hover:bg-[#021027] rounded-lg transition-all duration-300"
            :class="isActive('/WorkcellZoneStation')"
            @click="closeDropdown"
          >
            📋 Workcell Zone Station
          </RouterLink>



          
        </div>
      </div>

    </nav>

    <!-- Page Content -->
    <router-view class="p-6"></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const closeDropdown = () => {
  open.value = false
}

// === Close dropdown when clicking outside ===
const handleClickOutside = (event) => {
  if (!event.target.closest('.workcell-dropdown-parent')) {
    open.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClickOutside)
})

// === Active link styling ===
const isActive = (path) => {
  return route.path === path
    ? 'bg-[#031739] text-[#00baff] shadow-[0_0_10px_#00baff]'
    : 'hover:text-[#00baff]'
}

const isActiveGroup = (paths) => {
  return paths.includes(route.path)
    ? 'bg-[#031739] text-[#00baff] shadow-[0_0_10px_#00baff]'
    : 'hover:text-[#00baff]'
}
</script>
