const Catway = require('../models/Catway');

exports.createCatway = async (req, res) => {
    try {
        const catway = new Catway(req.body);
        await catway.save();
        res.status(201).send(catway);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCatways = async (req, res) => {
    try {
        const catways = await Catway.find();
        res.status(200).send(catways);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getCatway = async (req, res) => {
    try {
        const catway = await Catway.findById(req.params.id);
        if (!catway) {
            return res.status(404).send('Catway not found');
        }
        res.status(200).send(catway);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateCatway = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!catway) {
            return res.status(404).send('Catway not found');
        }
        res.status(200).send(catway);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteCatway = async (req, res) => {
    try {
        const catway = await Catway.findByIdAndDelete(req.params.id);
        if (!catway) {
            return res.status(404).send('Catway not found');
        }
        res.status(200).send('Catway deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};
