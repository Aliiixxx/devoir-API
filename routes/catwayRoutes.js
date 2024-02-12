const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");
const Catway = require("../models/Catway");

router.post("/", catwayController.createCatway);
router.get("/", catwayController.getCatways);
router.get("/:id", catwayController.getCatway);
router.put("/:id", catwayController.updateCatway);
router.patch("/:id", catwayController.updateCatway);
router.delete("/:id", catwayController.deleteCatway);
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
