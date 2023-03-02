<template>

  <div class="relative mb-3 xl:w-96">
    <input
        :type="props.type"
        v-model="props.text"
        class="block min-h-[auto] w-full  border-b-2  bg-transparent px-3 py-1.5 outline-none  transition-all duration-200 ease-linear focus:border-b-indigo-600 focus:placeholder:opacity-60 motion-reduce:transition-none "
        :placeholder="props.placeholder"
        @input="$emit('update:text', $event.target.value)"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: 'text' | 'password',
  placeholder?: string,
  text: string
}>(), {
  type: 'text'
})
</script>

<style scoped>

</style>