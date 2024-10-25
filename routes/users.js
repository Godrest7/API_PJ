const express = require("express");
const router = express.Router();

const db = require("../database")

// GET METHOD: LIRE tous les utilisateurs
router.get("/users", (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
      });
});

// POST METHOD: CRÉER un nouvel utilisateur
router.post("/", (req, res) => {
    // récupérer toutes les données qui arrivent dans le corps de la requête (body)
    const { firstName, lastName } = req.body;

    // récupérer l'ID du dernier utilisateur en fonction du nombre d'utilisateurs dans notre variable de tableau 'usersArray'
    const lastId = usersArray[usersArray.length - 1].id;
    // ajouter un pour créer un utilisateur unique
    const newId = lastId + 1;

    // créer le nouvel utilisateur avec les données du corps de la requête et l'ID calculé
    const newUser = {
        firstName,
        lastName,
        id: newId,
    };

    // ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
    usersArray.push(newUser);
    // envoyer le code de statut 201 (créé) et les données du nouvel utilisateur afin de confirmer au client
    res.status(201).json(newUser);
});

// PUT METHOD: Mettre à jour un utilisateur
router.put("/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur depuis l'URL et le convertir en entier
    const id = parseInt(req.params.id);

    // Trouver l'utilisateur correspondant à cet ID dans la liste 'usersArray'
    const userIndex = usersArray.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Récupérer les données envoyées dans le corps de la requête (firstName et lastName)
    const { firstName, lastName } = req.body;

    // Mettre à jour les valeurs si elles sont envoyées dans le body
    if (firstName) usersArray[userIndex].firstName = firstName;
    if (lastName) usersArray[userIndex].lastName = lastName;

    // Envoyer une réponse avec les nouvelles informations de l'utilisateur mis à jour
    res.json({
        msg: "Utilisateur mis à jour",
        user: usersArray[userIndex],
    });
});

// DELETE METHOD: Supprimer un utilisateur
router.delete("/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de l'URL
    const id = parseInt(req.params.id);

    // Trouver l'index de l'utilisateur correspondant à cet ID
    const userIndex = usersArray.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Supprimer l'utilisateur trouvé du tableau 'usersArray' en utilisant 'splice'
    usersArray.splice(userIndex, 1);

    // Envoyer une réponse confirmant la suppression de l'utilisateur
    res.json({
        msg: "Utilisateur supprimé",
    });
});

// GET METHOD: Récupérer un utilisateur par ID
router.get("/:id", (req, res) => {
    // Récupérer l'ID de l'utilisateur depuis les paramètres de l'URL
    const id = parseInt(req.params.id);

    // Trouver l'index de l'utilisateur correspondant à cet ID
    const userIndex = usersArray.findIndex((user) => user.id === id);

    // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
    if (userIndex < 0) {
        return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Si l'utilisateur est trouvé, renvoyer les informations de cet utilisateur
    res.json(usersArray[userIndex]);
});

module.exports = router;
