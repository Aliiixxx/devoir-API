const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Enregistre un nouvel utilisateur.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 required: true
 *                 format: email
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès.
 *       400:
 *         description: Utilisateur existe déjà.
 *       500:
 *         description: Erreur du serveur.
 */
router.post("/register", authController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Authentifie un utilisateur et renvoie un token JWT.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 required: true
 *                 format: email
 *               password:
 *                 type: string
 *                 required: true
 *     responses:
 *       200:
 *         description: Authentification réussie, retourne un token JWT.
 *       401:
 *         description: Identifiants invalides.
 *       500:
 *         description: Erreur du serveur.
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/users/{userId}:
 *   delete:
 *     summary: Supprime un utilisateur spécifié par son ID.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur du serveur.
 */
router.delete("/users/:userId", authController.deleteUser);

/**
 * @swagger
 * /api/auth/users/{userId}:
 *   put:
 *     summary: Met à jour les informations d'un utilisateur.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Informations de l'utilisateur mises à jour avec succès.
 *       404:
 *         description: Utilisateur non trouvé.
 *       500:
 *         description: Erreur du serveur.
 */
router.put("/users/:userId", authController.updateUser);

module.exports = router;
