<template>
    <UCard class="mt-2">
        <div>
            <h2
                v-if="!updated"
                class="text-sm">
                Mis à jour il y a {{ notesStore.getLastUpdate }}
            </h2>
            <h2
                v-else
                class="text-sm">
                Notes mises à jour.
            </h2>
            <UButton
                square
                :icon="loading?'i-svg-spinners-90-ring-with-bg' : 'i-lucide-refresh-ccw'"
                variant="outline"
                :label="loading ? 'Chargement...' : 'Actualiser'"
                class="mt-2"
                @click="handleUpdateNotes"
                :disabled="loading || updated"
            />
        </div>
    </UCard>
</template>

<script setup>
import { useNotesStore } from '@/stores/notesStore';
const notesStore = useNotesStore();
const loading = ref(false);
const code_ine = ref('')
const updated = ref(false)

const handleUpdateNotes = async () => {
    try {
        loading.value = true
        code_ine.value = localStorage.getItem('code_ine')
        await notesStore.fetchNotes(code_ine)
        updated.value = true
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}
</script>