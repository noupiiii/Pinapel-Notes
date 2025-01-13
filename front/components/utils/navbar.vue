<template>
    <div class="fixed bottom-0 left-0 w-full backdrop-blur-lg">
      <ul class="flex items-center justify-between mx-4 py-2">
        <li>
          <router-link
            to="/accueil"
            class="flex items-center gap-2 py-2 px-3 rounded-full"
            :class="{ 'bg-primary-500/30': $route.path === '/accueil' }"
          >
            <Home />
            <span :class="{ hidden: $route.path !== '/accueil' }">Accueil</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/search"
            class="flex items-center gap-2 py-2 px-3 rounded-full"
            :class="{ 'bg-primary-500/30': $route.path === '/search' }"
          >
            <Search />
            <span :class="{ hidden: $route.path !== '/search' }">Recherche</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/evolution"
            class="flex items-center gap-2 py-2 px-3 rounded-full"
            :class="{ 'bg-primary-500/30': $route.path === '/evolution' }"
          >
            <ChartSpline />
            <span :class="{ hidden: $route.path !== '/evolution' }" class="capitalize">évolution</span>
          </router-link>
        </li>
        <li @click="logout">
          <LogOut />
        </li>
      </ul>
    </div>
  </template>
  
  
  <script setup>
  import { Home, ChartSpline, Search, LogOut } from "lucide-vue-next";
  import { useRoute } from "vue-router";
  
  const $route = useRoute();
  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('notes')
    localStorage.removeItem('last_notes_update')
    localStorage.removeItem('code_ine')
    router.push({path:'/'})
  };

  </script>
  