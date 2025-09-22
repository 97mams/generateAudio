const gTTS = require("gtts");
// Texte de la table de 36
const text = `
Table de 36.
Trente-six fois un, trente-six.
Trente-six fois deux, soixante-douze.
Trente-six fois trois, cent huit.
Trente-six fois quatre, cent quarante-quatre.
Trente-six fois cinq, cent quatre-vingts.
Trente-six fois six, deux cent seize.
Trente-six fois sept, deux cent cinquante-deux.
Trente-six fois huit, deux cent quatre-vingt-huit.
Trente-six fois neuf, trois cent vingt-quatre.
Trente-six fois dix, trois cent soixante.
`;

// Création de l'objet gTTS
const speech = new gTTS(text, "fr");

// Sauvegarde en fichier MP3
speech.save("table_36.mp3", (err: any) => {
  if (err) {
    console.error("Erreur lors de la génération :", err);
  } else {
    console.log("✅ Fichier 'table_36.mp3' généré avec succès !");
  }
});
