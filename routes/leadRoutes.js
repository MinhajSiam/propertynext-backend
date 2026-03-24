const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

// ১. কাস্টমারদের ফর্ম জমা দেওয়ার API (POST Request)
router.post('/submit', async (req, res) => {
    try {
        const newLead = new Lead(req.body);
        const savedLead = await newLead.save();
        res.status(201).json({ message: "Thank you! Your request has been submitted successfully.", lead: savedLead });
    } catch (error) {
        res.status(500).json({ error: "Failed to submit request", details: error.message });
    }
});

// ২. অ্যাডমিন প্যানেলে সব লিড দেখার API (GET Request)
router.get('/all', async (req, res) => {
    try {
        // sort({ createdAt: -1 }) দেওয়ার কারণে একদম নতুন লিডগুলো তালিকার উপরে দেখাবে
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch leads" });
    }
});

module.exports = router;