<script setup lang="ts">
import Chrono from "~/components/timer/chrono.vue";
import TimesTable from "~/components/timer/timesTable.vue";

</script>

<template>
  <div class="flex flex-row-reverse items-stretch">
    <div class="flex align-middle items-center justify-center w-1/2">
      <Chrono />
    </div>
    <div class="w-1/2 mt-10">
      <TimesTable />
    </div>
  </div>
</template>

<style scoped>

</style>