<template>
  <div v-if="!close" class="fixed h-full w-full flex top-0 justify-center items-center pointer-events-none">
    <transition name="fade">
      <div
          v-if="show"
          class="w-2/5 max-w-[200px] aspect-square bg-black opacity-60 rounded-xl">
        <div class="flex flex-col items-center h-full">
          <div class="h-2/3 p-3.5">
            <svg class="h-full w-full fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
              <path
                  d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
            </svg>
          </div>
          <div class="text-white text-2xl h-1/3">
            {{ props.message }}
          </div>
        </div>
      </div>

    </transition>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, getCurrentInstance} from "vue";
import {delay} from "../utils/delay";

const show = ref(false);
const close = ref(false);
const self = ref();
const props = withDefaults(defineProps<{
  message?: string,
  delay?: number
}>(), {
  message: 'Success!',
  delay: 2000,
})
onMounted(async () => {
  show.value = true;
  await delay(props.delay)
  show.value = false
})


</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>