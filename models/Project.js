const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    status: { type: String, required: true }, // 'Ongoing' or 'Completed'
    badgeText: { type: String },
    coverImage: { type: String, required: true },
    price: { type: String },
    size: { type: String },
    handoverDate: { type: String },
    overview: { type: String },
    tourThumb: { type: String },
    mapUrl: { type: String },
    gallery: { type: [String] }, // একাধিক ছবির জন্য Array
    floorPlans: {
        typeA: { type: String },
        typeB: { type: String },
        ground: { type: String }
    },
    // Technical Specs & Locations
    specStructural: { type: String },
    specFlooring: { type: String },
    specKitchen: { type: String },
    specElectrical: { type: String },
    locationAdvantages: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);