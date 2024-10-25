const express = require("express");
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");

// Importation de la base de données depuis "database.js"
const db = require("./database.js");

// MIDDLEWARE
app.use(express.json());

// users endpoint
app.use("/api/", usersRouter);

// HOME GET METHOD
app.get("/", (req, res) => {
    res.json({
        msg: "welcome to my users API ! 🎉",
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Si vous devez créer une nouvelle connexion SQLite ici, renommez la variable
const sqlite3 = require("sqlite3").verbose();

// Ouvrir la connexion à la base de données en évitant la redéclaration de 'db'
const localDb = new sqlite3.Database("./users.db", (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");

        // Créer la table users si elle n'existe pas déjà
        localDb.run(
            `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT NOT NULL,
            lastName TEXT NOT NULL
          )`,
            (err) => {
                if (err) {
                    console.error("Error creating table:", err.message);
                }
            }
        );
    }
});

// Exporter la base de données locale pour l'utiliser dans d'autres modules si nécessaire
module.exports = localDb;
