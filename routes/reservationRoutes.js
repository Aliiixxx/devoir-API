const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

/**
 * @swagger
 * /api/reservations:
 *   get:
 *     summary: Liste toutes les réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Une liste de réservations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Erreur serveur
 */
router.get("/", reservationController.getAllReservations);

/**
 * @swagger
 * /api/catways/{id}/reservations:
 *   post:
 *     summary: Crée une nouvelle réservation pour un catway spécifié
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway pour lequel la réservation est faite
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reservation'
 *     responses:
 *       201:
 *         description: Réservation créée avec succès.
 *       404:
 *         description: Catway non trouvé.
 *       500:
 *         description: Erreur serveur
 */
router.post(
  "/catways/:id/reservations",
  reservationController.createReservation
);

/**
 * @swagger
 * /api/catways/{id}/reservations/{reservationId}:
 *   get:
 *     summary: Récupère une réservation spécifique par son ID pour un catway donné
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du catway associé à la réservation
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la réservation à récupérer
 *     responses:
 *       200:
 *         description: Détails de la réservation trouvée pour le catway spécifié.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation non trouvée ou Catway non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get(
  "/catways/:id/reservations/:reservationId",
  reservationController.getReservation
);

/**
 * @swagger
 * /api/reservations/{reservationId}:
 *   get:
 *     summary: Récupère les détails d'une réservation par son ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la réservation
 *     responses:
 *       200:
 *         description: Détails de la réservation trouvée.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get("/:reservationId", reservationController.getReservationDetails);

/**
 * @swagger
 * /api/reservations/{reservationId}:
 *   delete:
 *     summary: Supprime une réservation par son ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID de la réservation à supprimer
 *     responses:
 *       200:
 *         description: Réservation supprimée avec succès.
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.delete("/:reservationId", reservationController.deleteReservation);
module.exports = router;
