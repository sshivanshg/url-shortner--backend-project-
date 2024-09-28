const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,  // Changed 'typeof' to 'type'
        required: true,
        unique: true
    },
    redirectURL: {  // Changed from 'redirectUrl' to match the controller
        type: String,
        required: true,
    },
    visitHistory: [{timestamp: {type: Number}}],
}, {timestamps: true});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;