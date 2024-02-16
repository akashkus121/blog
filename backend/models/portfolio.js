// models/portfolio.js
const mongoose = require('mongoose');

// Define the schema for a user's portfolio
const portfolioSchema = new mongoose.Schema({
    username: String, // The username associated with the portfolio
    items: [
        {
            title: String, // Title of the portfolio item
            description: String, // Description of the portfolio item
        },
    ],
});

// Create a Mongoose model named 'Portfolio' based on the defined schema
const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// Export the Portfolio model
module.exports = Portfolio;

