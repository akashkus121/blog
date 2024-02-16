// routes/Portfolio.route.js
const express = require('express');
const router = express.Router();
const Portfolio = require('../models/portfolio');

// Get user's portfolio
router.get('/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const portfolio = await Portfolio.findOne({ username });

        // Check if the portfolio is found
        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ error: 'Portfolio not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Add a new item to user's portfolio
router.post('/:username', async (req, res) => {
    const username = req.params.username;
    const newItem = req.body;

    // Validate input (check if newItem has required fields, etc.)
    if (!newItem || !newItem.title || !newItem.description) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { username },
            { $push: { items: newItem } },
            { new: true, upsert: true }
        );
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete an item from user's portfolio
router.delete('/:username/:itemId', async (req, res) => {
    const username = req.params.username;
    const itemId = req.params.itemId;

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { username },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );

        // Check if the item was found and deleted
        if (portfolio) {
            res.json(portfolio);
        } else {
            res.status(404).json({ error: 'Item not found in portfolio' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

