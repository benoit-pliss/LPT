<template>
  <div>
    hello world
  </div>
  <div class="">
    <p class="text-9xl" :class="{
      'text-red-500': isKeyPressed && !isChronoReady,
      'text-green-500': isChronoReady,
      'text-gray-500': !isKeyPressed && !isChronoReady
    }">
      {{ displayTime }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import moment from "moment";

let timeout : any
let timer : number | null = null;

const isKeyPressed = ref(false);
const isChronoReady = ref(false);
const isChronoSarted = ref(false);

const startTime = ref<moment.Moment | null>(null);
const currentTime = ref<moment.Moment | null>(null);




const updateCurrentTime = () => {
  currentTime.value = moment();
}

const displayTime = computed(() => {
  if (!startTime.value || !currentTime.value) return '00:00.00';

  const duration = moment.duration(currentTime.value.diff(startTime.value));
  return moment.utc(duration.asMilliseconds()).format('mm:ss.SS');
});

const storeTime = async () => {
  if (!startTime.value || !currentTime.value) return;

  let timestamp = moment(currentTime.value.diff(startTime.value)).valueOf()


  const time = await useFetch('/api/times/addTimes', {
    method: 'POST',
    body: JSON.stringify({time_in_sec: timestamp})
  });

  console.log(time);
}

const handleKeyDown = (e: KeyboardEvent) => {
  if (e.code === 'Space' && !isKeyPressed.value) {
    isKeyPressed.value = true;



    if (!isChronoSarted.value) {
      timeout = setTimeout(() => {
        isChronoReady.value = true;
      }, 600);
    }


    if (isChronoSarted.value) {
      isChronoSarted.value = false;

      if (timer) {
        clearInterval(timer);
        timer = null;
        isChronoReady.value = false;
      }

      storeTime();
    }
  }
}

const handleKeyUp = (e: KeyboardEvent) => {
  if (e.code === 'Space') {

    if (isChronoReady.value && !isChronoSarted.value) {
      startTime.value = moment();

      timer = window.setInterval(() => {
        currentTime.value = moment();
      }, 10);

      isChronoSarted.value = true;
    }

    clearTimeout(timeout);
    isKeyPressed.value = false;
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
})

</script>

<style scoped>




</style>