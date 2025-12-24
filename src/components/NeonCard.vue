<template>
  <div class="neon-card">
    <h3 v-if="title" class="neon-title">{{ title }}</h3>

    <!-- 🔑 slot must flex -->
    <div class="neon-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>
