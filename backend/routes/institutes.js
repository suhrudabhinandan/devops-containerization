const express = require('express');
const router = express.Router();
const Institute = require('../models/institute');

// Add a new institute
router.post('/addInstitute', async (req, res) => {
    try {
        const { name, address, contactNumber } = req.body;
        const existingInstitute = await Institute.findOne({ where: { name } });
        if (existingInstitute) {
            return res.status(400).json({
                msg: "Institute already exists",
                existingInstitute
            });
        }
        const newInstitute = await Institute.create({ name, address, contactNumber });
        res.status(201).json({
            msg: "Institute created successfully ",
            newInstitute
        });
    } catch (error) {
        console.error("Add Institute Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Get all institutes
router.get('/allInstitutes', async (req, res) => {
    try {
        const allInstitutes = await Institute.findAll();
        res.status(200).json({
            msg: "All institutes fetched successfully",
            institutes: allInstitutes
        });
    } catch (error) {
        console.error("Fetch Institutes Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Get a single institute by ID
router.get('/getInstitute/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const institute = await Institute.findByPk(id);
        if (!institute) {
            return res.status(404).json({ msg: "Institute not found" });
        }
        res.status(200).json({
            msg: "Institute fetched successfully ✅",
            institute
        });
    } catch (error) {
        console.error("Fetch Institute Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

// Update an institute by ID
router.put('/updateInstitute/:id', async (req, res) => {
    const { id } = req.params;
    const { name, address, contactNumber } = req.body;

    try {
        const institute = await Institute.findByPk(id);
        if (!institute) {
            return res.status(404).json({ msg: "Institute not found" });
        }

        institute.name = name || institute.name;
        institute.address = address || institute.address;
        institute.contactNumber = contactNumber || institute.contactNumber;

        await institute.save();

        res.status(200).json({
            msg: "Institute updated successfully ✅",
            institute
        });
    } catch (error) {
        console.error("Update Institute Error:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports = router;



