const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const Catway = require("../models/Catway");

/**
 * @swagger
 * /api/catways:
 *   post:
 *     summary: Crée un nouveau catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       201:
 *         description: Le catway a été créé avec succès.
 *       500:
 *         description: Erreur serveur
 */
router.post("/", catwayController.createCatway);

/**
 * @swagger
 * /api/catways:
 *   get:
 *     summary: Liste tous les catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: Une liste de catways.
 *       500:
 *         description: Erreur serveur
 */
router.get("/", catwayController.getCatways);

/**
 * @swagger
 * /api/catways/{id}:
 *   get:
 *     summary: Récupère un catway par son ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway
 *     responses:
 *       200:
 *         description: Un catway trouvé par son ID.
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/:id", catwayController.getCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   put:
 *     summary: Met à jour un catway par son ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway mis à jour avec succès.
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.put("/:id", catwayController.updateCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   patch:
 *     summary: Met à jour partiellement un catway par son ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Catway'
 *     responses:
 *       200:
 *         description: Catway mis à jour partiellement avec succès.
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.patch("/:id", catwayController.updateCatway);

/**
 * @swagger
 * /api/catways/{id}:
 *   delete:
 *     summary: Supprime un catway par son ID
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway à supprimer
 *     responses:
 *       200:
 *         description: Catway supprimé avec succès.
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:id", catwayController.deleteCatway);

/**
 * @swagger
 * /api/catways/byNumber/{number}:
 *   get:
 *     summary: Récupère un catway par son numéro
 *     tags: [Catways]
 *     parameters:
 *       - in: path
 *         name: number
 *         required: true
 *         schema:
 *           type: string
 *         description: Le numéro du catway
 *     responses:
 *       200:
 *         description: Un catway trouvé par son numéro.
 *       404:
 *         description: Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get("/byNumber/:number", async (req, res) => {
  try {
    const number = req.params.number;
    const catway = await Catway.findOne({ catwayNumber: number });
    if (!catway) {
      return res.status(404).send({ message: "Catway not found" });
    }
    res.status(200).json(catway);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
