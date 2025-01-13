<template>
  <div @click="toggleTheme" class="fixed top-3 right-3 text-primary-400 backdrop-blur-xl bg-primary-500/20 p-2 rounded-full">
        <Sun v-if="isDarkMode" />
        <Moon v-else />
  </div>
</template>

<script setup>
import {Sun, Moon} from 'lucide-vue-next'
const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  const root = document.documentElement;
  if (isDarkMode.value) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

const initializeTheme = () => {
  isDarkMode.value = document.documentElement.classList.contains('dark');
};

onMounted(() => {
  initializeTheme();
});
</script>
