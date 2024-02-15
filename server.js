require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const authenticateJWT = require("./middleware/auth");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/catways", authenticateJWT, catwayRoutes);
app.use("/api/reservations", authenticateJWT, reservationRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de gestion de Catways",
      version: "1.0.0",
      description:
        "Cette API permet de gérer les catways dans un système de réservation de marina.",
    },
    servers: [
      {
        url: "http://localhost:3000/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion de catways");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));

module.exports = app;
