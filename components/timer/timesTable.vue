<script setup lang="ts">
import moment from "moment";
import {getTimes} from "~/services/timesService";

let solves = ref<Times[]>([])

async function getSolves() {
  getTimes().then(
      res => {
        solves.value = res;
      }
  )
  console.log(solves.value)
}

function displayTime(timestamp: number) {
  return moment.utc(timestamp).format('mm:ss.SS')
}

onMounted( () => {
  getSolves()
  window.addEventListener('keyup', getSolves);
})

</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Résolutions</h1>
        <p class="mt-2 text-xl text-gray-700">
          Liste des résolutions enregistrées
        </p>
      </div>

    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 overflow-y-scroll">
          <table class="min-w-full divide-y divide-gray-300 text-lg">
            <thead>
            <tr class="divide-x divide-gray-200">
              <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">id</th>
              <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
              <th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">AO5</th>
              <th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-0">AO12</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="solve in solves" :key="solve.id_time" class="divide-x divide-gray-200">
              <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-0">{{ solve.id_time }}</td>
              <td class="whitespace-nowrap p-4 text-3xl text-gray-500">{{ displayTime(solve.time_in_sec) }}</td>
              <td class="whitespace-nowrap p-4 text-sm text-gray-500">null</td>
              <td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-0">null</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>