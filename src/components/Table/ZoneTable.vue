<template>
  <!-- Wrapper allows horizontal scroll if table is wide -->
  <div class="overflow-x-auto">
    <!-- Main table -->
    <table class="w-full text-sm border-collapse">
      <!-- TABLE HEADER -->
      <thead>
        <tr class="text-[#00eaff] border-b border-[#0ff]">
          <th class="px-2 py-2 text-left">Zone</th>
          <th class="px-2 py-2 text-left">Station</th>
          <th class="px-2 py-2 text-center">Status</th>
          <th class="px-2 py-2 text-right">WIP_Bal</th>
          <th class="px-2 py-2 text-right">WIP_Curr</th>
          <th class="px-2 py-2 text-right">Material In</th>
          <th class="px-2 py-2 text-right">Plan Output</th>
          <th class="px-2 py-2 text-right">Output</th>
          <th class="px-2 py-2 text-right">Reject</th>
        </tr>
      </thead>

      <!-- TABLE BODY -->
      <tbody>
        <!-- Loop through each prepared row -->
        <tr v-for="(r, i) in rows" :key="i" class="border-b border-[#1f3555] hover:bg-[#081b33]">
          <!-- Zone number -->
          <td class="px-2 py-1">{{ r.zone }}</td>

          <!-- Station name -->
          <td class="px-2 py-1">{{ r.name }}</td>

          <!-- Running / Stop status -->
          <td class="px-2 py-1 text-center">
            <span :class="r.is_running ? 'text-green-400' : 'text-red-400'">
              {{ r.is_running ? '● Running' : '● Stop' }}
            </span>
          </td>

          <!-- Numeric values -->
          <td class="px-2 py-1 text-right">{{ r.PassWip }}</td>
          <td class="px-2 py-1 text-right">{{ r.wip }}</td>
          <td class="px-2 py-1 text-right">{{ r.material_in }}</td>
          <td class="px-2 py-1 text-right">{{ r.planned_output }}</td>
          <td class="px-2 py-1 text-right">{{ r.prod_output }}</td>
          <td class="px-2 py-1 text-right">{{ r.reject_qty }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * PROPS
 * This component RECEIVES a workcell object from parent
 * It does NOT call API itself
 */
const props = defineProps<{
  workcell: any
}>()

/**
 * COMPUTED: rows
 * ----------------
 * Purpose:
 * - Convert nested data structure into flat table rows
 *
 * Input structure:
 * workcell
 *  └─ zones[]
 *      └─ stations[]
 *
 * Output structure:
 * [
 *   { zone, name, is_running, wip, material_in, prod_output, reject_qty }
 * ]
 */
const rows = computed(() => {
  // Safety check: if workcell or zones do not exist
  if (!props.workcell?.zones) return []

  const plannedOutput = props.workcell.planned_output ?? 0 // Get planned output from workcell, default to 0 if undefined

  // Flatten zones → stations into a single array
  return props.workcell.zones.flatMap((zone: any) =>
    zone.stations.map((st: any) => ({
      zone: zone.zone_name, // Zone number
      name: st.name, // Station name
      is_running: st.is_running, // Boolean status
      PassWip: st.PassWip, // Passing WIP
      wip: st.wip, // Work in progress
      material_in: st.material_in, // Material input
      planned_output: plannedOutput, // Planned output from workcell
      prod_output: st.prod_output, // Output quantity
      reject_qty: st.reject_qty, // Reject quantity
    })),
  )
})
</script>
