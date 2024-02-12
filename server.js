require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.static(path.join(__dirname, "public")));

const authRoutes = require("./routes/authRoutes");
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion de catways");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
