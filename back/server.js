const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const dotenv = require('dotenv');
const cors = require('cors');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

const URL = 'http://194.57.179.42/abs/pt.php';

// Route POST pour récupérer les notes de tous les semestres
app.post('/fetch-notes', async (req, res) => {
    console.log('/fetch-notes');
    const { code_ine } = req.body;

    if (!code_ine) {
        return res.status(400).json({ error: 'Veuillez fournir le code_ine.' });
    }

    try {
        var allSemesters = {};

        // Boucle pour récupérer les notes des 6 semestres
        for (let sem = 1; sem <= 6; sem++) {
            console.log(`Récupération des données pour le semestre ${sem}`);
            const response = await axios.post(
                URL,
                new URLSearchParams({
                    code_ine,
                    sem,
                }),
                { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
            );

            // Charger le HTML dans jsdom
            const dom = new JSDOM(response.data);
            const document = dom.window.document;

            // Vérifiez si le tableau contenant les notes existe
            const rows = document.querySelectorAll('.notes_bulletin_row_mod');
            if (rows.length === 0) {
                console.warn(`Aucune donnée trouvée pour le semestre ${sem}`);
                allSemesters[`semestre_${sem}`] = [];
                continue;
            }

            // Extraire les données des notes
            const notes = Array.from(rows).map(row => {
                const moduleCode = row.children[1]?.textContent?.trim() || 'N/A';
                const moduleName = row.children[2]?.textContent?.trim() || 'N/A';
                const note = row.children[5]?.textContent?.trim() || 'N/A';
                const coef = row.children[6]?.textContent?.trim() || 'N/A';
                return { moduleCode, moduleName, note, coef };
            });

            // Ajouter les notes du semestre au résultat final
            allSemesters[`semestre_${sem}`] = notes;
            console.log(allSemesters)
        }

        // Renvoyer les données consolidées
        res.json({ success: true, data: allSemesters });
    } catch (error) {
        console.error('Erreur lors de la récupération des notes :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des notes.' });
    }
});

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
