<template>
  <div>
    <NuxtLayout />
  </div>
</template>

<script setup>
const notesStore = useNotesStore();
notesStore.initializeStore();
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>