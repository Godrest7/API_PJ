const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require("./routes/users.js");

app.use(express.json());
app.use("/api/", usersRouter);

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

// PUT: Mettre à jour un utilisateur basé sur les données envoyées dans le corps (body) de la requête et l'ID utilisateur passé dans l'URL
app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { firstName, lastName } = req.body;

    db.run(
        "UPDATE users SET firstName = ?, lastName = ? WHERE id = ?",
        [firstName, lastName, id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur: " + err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ msg: "Utilisateur non trouvé" });
            }
            res.json({ msg: "Utilisateur mis à jour", userId: id, firstName, lastName });
        }
    );
});

// DELETE: Supprimer un utilisateur basé sur l'ID passé dans l'URL
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur: " + err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }
        res.json({ msg: "Utilisateur supprimé" });
    });
});

// GET: Récupérer un utilisateur basé sur l'ID passé dans l'URL
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération de l'utilisateur: " + err.message });
        }
        if (!row) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }
        res.json(row);
    });
});
