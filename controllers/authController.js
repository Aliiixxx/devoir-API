const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).send('User already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        let updates = req.body;

        if (updates.password) {
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            updates.password = hashedPassword;
        }

        const user = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};
