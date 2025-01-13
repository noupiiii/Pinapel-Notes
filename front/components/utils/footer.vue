<template>
    <div class="backdrop-blur-sm border-t w-full dark:border-gray-700 mt-4 text-gray-500 fixed bottom-0 left-0">
      <UContainer class="flex gap-3">
        <div class="flex space-x-4">
          <div v-for="link in links" :key="link.name" class="flex items-center space-x-2">
            <a :href="link.url" target="_blank" class="flex items-center hover:text-gray-300 transition gap-2" rel="noopener noreferrer">
              <UIcon :name="link.icon" size="16" />
              {{ link.name }}
            </a>
          </div>
        </div>
      </UContainer>
    </div>
    </template>
    
    <script setup>
    
    const links = ref([
      { name: 'GitHub', url: 'https://github.com', icon: 'i-simple-icons-github' },
      { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'i-simple-icons-linkedin' }
    ]);
    </script>