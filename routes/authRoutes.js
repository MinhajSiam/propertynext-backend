const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// ১. প্রথমবার অ্যাডমিন অ্যাকাউন্ট তৈরি করার API (শুধু একবার ব্যবহার করতে হবে)
router.post('/setup', async (req, res) => {
    try {
        const adminExists = await Admin.findOne({ email: "admin@propertynext.com" });
        if (adminExists) return res.status(400).json({ message: "Admin account already exists!" });

        // পাসওয়ার্ড এনক্রিপ্ট বা হ্যাশ করা হচ্ছে
        const hashedPassword = await bcrypt.hash("admin1234", 10);

        const newAdmin = new Admin({
            email: "admin@propertynext.com",
            password: hashedPassword
        });

        await newAdmin.save();
        res.status(201).json({ message: "Admin account created successfully! Email: admin@propertynext.com | Password: admin1234" });
    } catch (error) {
        res.status(500).json({ error: "Setup failed", details: error.message });
    }
});

// ২. লগইন করার API
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // ইমেইল চেক করা
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(404).json({ error: "Invalid Email Address!" });

        // পাসওয়ার্ড চেক করা
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect Password!" });

        // সব ঠিক থাকলে টোকেন তৈরি করা (এটি ২৪ ঘণ্টা মেয়াদ থাকবে)
        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login Successful!", token });
    } catch (error) {
        res.status(500).json({ error: "Login failed", details: error.message });
    }
});

module.exports = router;