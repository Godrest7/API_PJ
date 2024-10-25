const express = require("express");
const router = express.Router();

const db = require("../database");
const { getAllUsers, createNewUser, updateUser, deleteUser } = require("../controllers/usersControllers");

// GET METHOD: LIRE tous les utilisateurs
router.get("/users", getAllUsers);

// POST METHOD: CRÉER un nouvel utilisateur
router.post("/users", createNewUser);

// PUT METHOD: Mettre à jour un utilisateur
router.put("/:id", updateUser);

// DELETE METHOD: Supprimer un utilisateur
router.delete("/:id", deleteUser);

// GET METHOD: Récupérer un utilisateur par ID
router.get("/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const id = parseInt(req.params.id);

    // Requête SQL pour récupérer l'utilisateur correspondant à cet ID
    db.get("SELECT * FROM users WHERE id = ?", [id], (err, row) => {
        // Si une erreur se produit pendant la requête
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
        if (!row) {
            return res.status(404).json({ msg: "Utilisateur non trouvé" });
        }

        // Si l'utilisateur est trouvé, renvoyer les informations de cet utilisateur
        res.json(row);
    });
});

module.exports = router;
