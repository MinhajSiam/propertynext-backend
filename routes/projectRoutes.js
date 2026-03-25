const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// ১. নতুন প্রজেক্ট অ্যাড করার API (POST Request)
router.post('/add', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.status(201).json({ message: "Project added successfully!", project: savedProject });
    } catch (error) {
        res.status(500).json({ error: "Failed to add project", details: error.message });
    }
});

// ২. সব প্রজেক্ট দেখার API (GET Request)
router.get('/all', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
    }
});

// ৩. প্রজেক্ট আপডেট করার API (PUT Request)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // আপডেট হওয়ার পর নতুন ডেটা রিটার্ন করবে
        );

        if (!updatedProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json({ message: "Project updated successfully!", project: updatedProject });
    } catch (error) {
        res.status(500).json({ error: "Failed to update project", details: error.message });
    }
});

// ৪. প্রজেক্ট ডিলিট করার API (DELETE Request)
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete project" });
    }
});

// ৫. নির্দিষ্ট একটি প্রজেক্টের ডেটা দেখার API (GET Request)
router.get('/single/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch project details" });
    }
});

module.exports = router;