const express = require("express");
const router = express.Router();
const Result = require("../models/result");
const bothTeacherStudent = require("../Middleware/isTeacherorStudent");
const isTeacher = require("../Middleware/isTeacher");
const tokenVerify = require("../Middleware/token-verification");

router.use(tokenVerify);

// ➤ Create Result
router.post("/resultCreate",isTeacher, async (req, res) => {
  try {
    const result = await Result.create(req.body);
    res.status(201).json({
      message: "Result created successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ➤ Get All Results
router.get("/getAllResults",bothTeacherStudent, async (req, res) => {
  try {
    const results = await Result.findAll();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ➤ Get Single Result by ID
router.get("/getResult/:id",bothTeacherStudent, async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ➤ Get Results by Student ID
router.get("/getResultsByStudent/:studentId", bothTeacherStudent, async (req, res) => {
  try {
    const { studentId } = req.params;

    const results = await Result.findAll({
      where: { studentId }
    });

    if (!results || results.length === 0) {
      return res.status(404).json({ message: "No results found for this student" });
    }

    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ➤ Update Result
router.put("/updateResult/:id",isTeacher, async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }

    await result.update(req.body); // will trigger auto % calculation

    res.json({
      message: "Result updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ➤ Delete Result
router.delete("/deleteResult/:id",isTeacher, async (req, res) => {
  try {
    const result = await Result.findByPk(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Result not found" });
    }

    await result.destroy();

    res.json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
