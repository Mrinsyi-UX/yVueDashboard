<template>
  <div class="p-6">
    <h1 class="neon-title text-3xl mb-6">Workcells – Zones – Stations Overview</h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-2 gap-4">
      <WorkcellZoneStationCard
        v-for="wc in workcells"
        :key="wc.id"
        :wc="wc"
      />
    </div>
  </div>
</template>

<script setup>
import { WORKCELLS } from "../data/WCdetail.js";
import WorkcellZoneStationCard from "../components/WorkcellZoneStationCard.vue";

const workcells = WORKCELLS;
</script>
