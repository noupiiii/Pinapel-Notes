const axios = require('axios');
const { JSDOM } = require('jsdom');

const url = 'http://194.57.179.42/abs/pt.php';

const fetchNotes = async () => {
    try {
        // Envoyer le formulaire avec le code INE
        const response = await axios.post(
            url,
            new URLSearchParams({
                code_ine: '070764642FK', // Remplacez par votre numéro INE
                sem: '4',               // Sélectionnez un semestre
            }),
            { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        // Charger le HTML dans jsdom
        const dom = new JSDOM(response.data);
        const document = dom.window.document;

        // Extraire les données des notes
        const rows = document.querySelectorAll('.notes_bulletin_row_mod');
        const notes = Array.from(rows).map(row => {
            const moduleCode = row.children[1]?.textContent.trim();
            const moduleName = row.children[2]?.textContent.trim();
            const note = row.children[5]?.textContent.trim();
            const coef = row.children[6]?.textContent.trim();
            return { moduleCode, moduleName, note, coef };
        });

        console.log('Notes récupérées :', notes);
    } catch (error) {
        console.error('Erreur lors de la récupération des notes :', error);
    }
};

fetchNotes();
