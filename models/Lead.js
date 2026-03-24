const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String }, // এটি অপশনাল
    purpose: { type: String, required: true }, // যেমন: Site Visit, EMI Details
    status: { type: String, default: 'New' } // নতুন লিড আসলে অটোমেটিক New স্ট্যাটাস পাবে
}, { timestamps: true });

module.exports = mongoose.model('Lead', leadSchema);