<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3 mt-3 bg-transparent">

        <!-- Sélection du semestre -->
        <USelect
        v-model="selectedSemester"
        :options="semesterOptions"
        placeholder="Sélectionnez un semestre"
        class="text-primary-400"
        />
        
        <!-- Sélection des colonnes -->
        <div class="flex border-gray-200 dark:border-gray-700">
      <USelectMenu
        v-model="selectedColumns"
        :options="columns"
        multiple
        placeholder="Colonnes"
        class="text-primary-400"
        />
    </div>
</div>

    <!-- Tableau des notes -->
    <div v-if="notesForSelectedSemester.length" class="w-full text-xs overflow-x-auto">
      <UTable :columns="selectedColumns" :rows="notesForSelectedSemester" />
    </div>

    <!-- Message si aucune note -->
    <div v-else class="text-primary-500 text-sm">
      Aucune note disponible pour le semestre sélectionné.
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useNotesStore } from '@/stores/notesStore';

// Store pour les notes
const notesStore = useNotesStore();

// Données des colonnes
const columns = [
    { key: 'note', label: 'Note' },
    { key: 'moduleName', label: 'Nom Module' },
    { key: 'coef', label: 'Coefficient' },
    { key: 'moduleCode', label: 'Code Module' },
];

// Colonnes sélectionnées par défaut
const selectedColumns = ref([
  columns[0], // "Note"
  columns[1], // "Nom Module"
]);

// Options pour le menu déroulant des semestres
const semesters = computed(() => Object.keys(notesStore.notes));
const semesterOptions = computed(() =>
  semesters.value.map((sem) => ({
    label: sem.replace('_', ' ').toUpperCase(),
    value: sem,
  }))
);

// Sélection du dernier semestre par défaut
const selectedSemester = ref(semesters.value.length ? semesters.value[semesters.value.length - 1] : 'semestre_1');

// Notes filtrées pour le semestre sélectionné (on exclut celles avec une note "tilde")
const notesForSelectedSemester = computed(() =>
  (notesStore.notes[selectedSemester.value] || []).filter((note) => note.note !== '~')
);
</script>
