const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true }, // 'Ongoing' or 'Completed'
    badgeText: { type: String },
    coverImage: { type: String, required: true },
    price: { type: String },
    size: { type: String },
    handoverDate: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);