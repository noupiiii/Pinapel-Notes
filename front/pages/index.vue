<template>
    <div class="h-screen flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold text-primary-400 mb-2">PinapleNotes</h1>
      <h2 class="hover:underline">
        <a href="https://github.com/noupiiii?tab=repositories" target="_blank" rel="noopener noreferrer">
          by n0upiiii
        </a>
      </h2>
      <UForm class="mt-4" @submit="handleSubmit">
        <UFormGroup label="Code INE">
          <UInput
            v-model="codeIne"
            placeholder="Entrez votre code INE"
            required
          />
        </UFormGroup>
        <UFormGroup class="mt-2">
          <UButton
            block
            :label="loading ? 'Chargement...' : 'Obtenir mes notes'"
            :icon="loading ? 'i-svg-spinners-90-ring-with-bg' : 'i-lucide-send-horizontal'"
            no-rel
            variant="outline"
            type="submit"
            :disabled="!codeIne || loading"
          />
        </UFormGroup>
      </UForm>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useNotesStore } from '@/stores/notesStore';
  
  const notesStore = useNotesStore();
  const codeIne = ref('');
  const loading = ref(false);

  const router = useRouter()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loading.value = true;
      await notesStore.fetchNotes(codeIne);
      router.push({path: "/accueil"})
    } catch (err) {
      console.error('Erreur lors de la récupération des notes:', err);
    } finally {
      loading.value = false;
    }
  };
  
  definePageMeta({
    layout: 'custom',
  });
  </script>
  
  <style scoped>
  /* Ajoutez ici vos styles uniquement */
  </style>
  