<template>
  <div class="bg-amber-500">
    <p class="font-sans w-full h-32 text-9xl" :class="
      {
        'text-red-500': isSpacebarPressed && !ready,
        'text-green-500': ready,
         'text-white': !isSpacebarPressed && !ready

      }">{{ formattedTime }}</p>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <button @click="reset">Reset</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment';

// State variables
const startTime = ref<moment.Moment | null>(null);
const currentTime = ref<moment.Moment | null>(null);
let timer: number | null = null;

const isSpacebarPressed = ref(false);
const ready = ref(false);
let pressTime: moment.Moment | null = null;

const isRunning = ref(false);

// Computed property to format the elapsed time
const formattedTime = computed(() => {
  if (!startTime.value || !currentTime.value) return '00:00.00';
  const duration = moment.duration(currentTime.value.diff(startTime.value));

  return moment(duration.asMilliseconds()).format('mm:ss.SS');
});

// Methods to control the timer
const start = () => {
  if (timer) return;
  if (ready.value === false) return;
  startTime.value = startTime.value || moment();
  timer = window.setInterval(() => {
    currentTime.value = moment();
  }, 10);
  isRunning.value = true;
};

const stop = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
    ready.value = false;
  }
  isRunning.value = false;
};

const reset = () => {
  stop();
  startTime.value = null;
  currentTime.value = null;
};

// Cleanup interval on component unmount
onBeforeUnmount(() => {
  stop();
});

// Event handlers
function handleSpacebarPress(event: KeyboardEvent) {
  if (event.keyCode === 32) {
    isSpacebarPressed.value = true;

    if (pressTime === null) {
      pressTime = moment();
    } else {
      const elapsedTime = moment().diff(pressTime);
      if (elapsedTime >= 1200) {
        ready.value = true;
      }
    }
  }
}

function handleSpacebarRelease(event: KeyboardEvent) {
  if (event.keyCode === 32) {
    isSpacebarPressed.value = false;
    console.log('release');

    if (startTime.value !== null && isRunning.value) {
      console.log('stop');
      stop();
      return;
    }

    if (pressTime) {
      if (ready.value) {
        reset();
        start();
      }
      pressTime = null;
    }
  }
}

// Add event listeners on component mount
onMounted(() => {
  window.addEventListener('keydown', handleSpacebarPress);
  window.addEventListener('keyup', handleSpacebarRelease);
});

// Remove event listeners on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleSpacebarPress);
  window.removeEventListener('keyup', handleSpacebarRelease);
});
</script>

<style scoped>
button {
  margin: 0 5px;
}
</style>
