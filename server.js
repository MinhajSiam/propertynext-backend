const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Mongoose যুক্ত করা হলো
const Project = require('./models/Project'); // এটি যুক্ত করুন
const Lead = require('./models/Lead');       // এটি যুক্ত করুন
require('dotenv').config();

// সার্ভার তৈরি করা
const app = express();

// মিডলওয়্যার (Middleware)
app.use(cors());
app.use(express.json());

// MongoDB ডেটাবেস কানেকশন
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully! 🟢");
    })
    .catch((error) => {
        console.log("MongoDB Connection Failed! 🔴", error);
    });

// বেসিক রাউট
app.get('/', (req, res) => {
    res.send('PropertyNext Backend Server is Running Perfectly! 🚀');
});

// Project Routes যুক্ত করা হলো
const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Lead Routes (নতুন যুক্ত করা হলো)
const leadRoutes = require('./routes/leadRoutes');
app.use('/api/leads', leadRoutes);

// Auth/Login Route যুক্ত করা হলো
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Dashboard Stats API
app.get('/api/stats', async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const ongoingProjects = await Project.countDocuments({ status: 'Ongoing' });
        const completedProjects = await Project.countDocuments({ status: 'Completed' }); // নতুন লাইন
        const newLeads = await Lead.countDocuments({ status: 'New' });

        res.status(200).json({ totalProjects, ongoingProjects, completedProjects, newLeads });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

// পোর্ট সেট করা
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});