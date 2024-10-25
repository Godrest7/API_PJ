const db = require("../database")

// Fonction pour récupérer tous les utilisateurs
exports.getAllUsers = function (req, res) {
    db.all("SELECT * FROM users", [], (err, rows) => {
        if (err) {
            // Si une erreur se produit lors de la récupération, renvoyer un message d'erreur
            res.status(500).json({ error: err.message })
        } else {
            // Retourner tous les utilisateurs
            res.json(rows)
        }
    })
}

// Fonction pour vérifier si une chaîne de caractères est alphanumérique
function isAlphanumeric(str) {
    const regex = /^[a-z0-9]+$/i;
    return regex.test(str);
}

// Fonction pour créer un nouvel utilisateur
exports.createNewUser = (req, res) => {
    const { firstName, lastName } = req.body;

    // Vérifier que le prénom et le nom de famille sont fournis
    if (!firstName || !lastName)
        return res.status(400).json({ error: "Le prénom ou le nom de famille est requis!" });
    
    // Vérifier que le prénom et le nom sont de type chaîne
    if (typeof firstName !== "string")
        return res.status(400).json({ error: "Ce prénom ou nom de famille est étrange!" });

    // Vérifier que le prénom est alphanumérique
    if (!isAlphanumeric(firstName))
        return res.status(400).json({ error: "Ce prénom ou nom de famille n'est pas autorisé!" });    

    // Insérer un nouvel utilisateur dans la base de données
    db.run(
        "INSERT INTO users (firstName, lastName) VALUES (?, ?)",
        [firstName, lastName],
        function (err) {
            if (err) {
                // Si une erreur se produit lors de l'insertion, renvoyer un message d'erreur
                res.status(500).json({ error: err.message })
            } else {
                // Retourner l'ID du nouvel utilisateur
                res.status(201).json({ id: this.lastID, firstName })
            }
        }
    )
}

// Fonction pour mettre à jour un utilisateur en fonction de son ID
exports.updateUser = (req, res) => {
    const { firstName, lastName } = req.body;
    const userId = req.params.id;

    // Créer des champs de mise à jour et des paramètres de requête
    let updateFields = [];
    let queryParams = [];

    // Ajouter les champs à mettre à jour s'ils sont fournis
    if (firstName) {
        updateFields.push("firstName = ?");
        queryParams.push(firstName);
    }

    if (lastName) {
        updateFields.push("lastName = ?");
        queryParams.push(lastName);
    }

    if (updateFields.length > 0) {
        // Ajouter l'ID de l'utilisateur comme dernier paramètre
        queryParams.push(userId);

        // Construire la requête SQL pour la mise à jour
        const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = ?`;

        // Exécuter la requête de mise à jour
        db.run(query, queryParams, function (err) {
            if (err) {
                // Si une erreur se produit lors de la mise à jour, renvoyer un message d'erreur
                return res.status(500).json({ error: err.message });
            } else if (this.changes === 0) {
                // Si l'utilisateur n'a pas été trouvé
                return res.status(404).json({ message: "Utilisateur non trouvé" });
            } else {
                // Retourner un message de succès
                return res.json({ msg: "Utilisateur mis à jour", userId, firstName, lastName });
            }
        });
    } else {
        // Si aucun champ n'a été envoyé pour la mise à jour
        res.status(400).json({ message: "Aucun champ à mettre à jour" });
    }
};

// Fonction pour supprimer un utilisateur en fonction de son ID
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    // Exécuter la requête de suppression
    db.run("DELETE FROM users WHERE id = ?", [id], function (err) {
        if (err) {
            // Si une erreur se produit lors de la suppression, renvoyer un message d'erreur
            res.status(500).json({ error: err.message })
        } else if (this.changes === 0) {
            // Si l'utilisateur n'a pas été trouvé
            res.status(404).json({ message: "Utilisateur non trouvé" })
        } else {
            // Retourner un message de succès
            res.status(200).json({ message: "Utilisateur supprimé!" })
        }
    })
}
