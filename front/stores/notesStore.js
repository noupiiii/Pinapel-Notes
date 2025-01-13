import { defineStore } from "pinia";
import axios from "axios";

export const useNotesStore = defineStore('notesStore', {
    state: () => ({
        notes: [],
        error: '',
        code_ine: '',
    }),
    getters: {
        getCodeIne: (state) => state.code_ine,
getLastUpdate: (state) => {
  const storedLastUpdate = localStorage.getItem('last_notes_update');
  if (storedLastUpdate) {
    const lastUpdateDate = new Date(storedLastUpdate);
    const currentDate = new Date();
    const secondsSinceLastUpdate = Math.floor((currentDate - lastUpdateDate) / 1000);

    if (secondsSinceLastUpdate < 60) {
      return `${secondsSinceLastUpdate} seconde${secondsSinceLastUpdate > 1 ? 's' : ''}`;
    }

    const minutesSinceLastUpdate = Math.floor(secondsSinceLastUpdate / 60);
    if (minutesSinceLastUpdate < 60) {
      return `${minutesSinceLastUpdate} minute${minutesSinceLastUpdate > 1 ? 's' : ''}`;
    }

    const hoursSinceLastUpdate = Math.floor(minutesSinceLastUpdate / 60);
    if (hoursSinceLastUpdate < 24) {
      return `${hoursSinceLastUpdate} heure${hoursSinceLastUpdate > 1 ? 's' : ''}`;
    }

    const daysSinceLastUpdate = Math.floor(hoursSinceLastUpdate / 24);
    if (daysSinceLastUpdate < 7) {
      return `${daysSinceLastUpdate} jour${daysSinceLastUpdate > 1 ? 's' : ''}`;
    }

    const weeksSinceLastUpdate = Math.floor(daysSinceLastUpdate / 7);
    return `${weeksSinceLastUpdate} semaine${weeksSinceLastUpdate > 1 ? 's' : ''}`;
  }

  return 'Aucune mise à jour enregistrée';
}

    },
    actions: {
        async initializeStore() {
            const router = useRouter()
            // Récupérer les données du localStorage si elles existent
            const storedCodeIne = localStorage.getItem('code_ine');
            const storedNotes = localStorage.getItem('notes');
            const storedLastUpdate = localStorage.getItem('last_notes_update');

            if (storedCodeIne) {
                this.code_ine = storedCodeIne;
            }
            if (storedNotes) {
                try {
                    this.notes = JSON.parse(storedNotes);
                } catch (err) {
                    console.error("Erreur lors de la lecture des notes depuis le localStorage :", err);
                    this.notes = [];
                }
            }
            if (storedLastUpdate) {
                console.log(storedLastUpdate)
                const lastUpdateDate = new Date(storedLastUpdate);
                const currentDate = new Date();
                const secondsSinceLastUpdate = Math.floor((currentDate - lastUpdateDate) / 1000);
                console.log('Dernière actualisation il y a ' + secondsSinceLastUpdate + ' secondes')

            }

            console.log(this.code_ine)
            console.log(this.notes)
        },
        async fetchNotes(code_ine) {
            try {
                const response = await axios.post('http://localhost:8000/fetch-notes', {
                    code_ine: code_ine.value,
                });
                console.log(response.data.data);
                this.notes = response.data.data || [];
                localStorage.setItem('code_ine', code_ine.value);
                localStorage.setItem('notes', JSON.stringify(this.notes));
                localStorage.setItem('last_notes_update', new Date().toISOString());
                this.code_ine = code_ine.value;
            } catch (err) {
                console.error(err);
                this.error = 'Erreur lors de la récupération des notes. Veuillez réessayer.';
            }
        },
    },
});
