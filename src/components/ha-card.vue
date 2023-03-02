<template>
  <Transition appear
              :duration="500"
              :name="props.appear"
              appear-active-class="animate__animated animate__fadeIn"

  >
    <div class="rounded-xl h-full w-full min-h-24 bg-white shadow-sm">
      <div class="flex flex-col px-4 py-3.5 place-content-between">
        <div class="flex justify-between items-center">
          <div class="flex justify-start items-center gap-3 ">
            <div class="h-6 w-6">
              <slot name="icon"></slot>
            </div>
            <div class="text-xl text-slate-700">
              {{ props.title }}
            </div>
          </div>
          <div>
            <slot name="panel-control">

            </slot>
          </div>
        </div>

        <slot>

        </slot>
        <div>
          <slot name="footer"></slot>
        </div>
      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import {onMounted} from "vue";

interface HaCardProps {
  title: string,
  appear?: 'shake' | 'v'
}

const props = withDefaults(defineProps<HaCardProps>(), {
  appear: 'shake'
});
const emits = defineEmits(['loaded']);

onMounted(() => {
  emits('loaded')
})
</script>

<style scoped>

</style>