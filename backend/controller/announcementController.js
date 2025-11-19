// controller/announcementController.js
const Announcement = require("../models/Announcement");


// ✅ Create a new announcement
exports.createAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body ; 
    const institute_id = req.user?.instituteId; 

    if (!institute_id) {
      return res.status(400).json({ error: "Teacher's instituteId not found" });
    }

    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }

    const announcement = await Announcement.create({
      title,
      description,
      institute_id,
      teacher_id: req.user?.id,
     
    });

    res.status(201).json({
      success: true,
      message: "Announcement created successfully",
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.getAnnouncements = async (req, res) => {
  try {
    const instituteId = req.user?.institute_id || req.user?.instituteId; 
    

    if (!instituteId) {
      return res.status(400).json({ error: "User's institute_id not found" });
    }

    const announcements = await Announcement.findAll({
      where: { institute_id: instituteId }, 
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      announcements,
    });
  } catch (err) {
    console.error("Error fetching announcements:", err);
    res.status(500).json({ error: err.message });
  }
};


exports.updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }

    
    if (announcement.instituteId !== req.user.instituteId) {
      return res.status(403).json({ error: "Access denied" });
    }

    announcement.title = title || announcement.title;
    announcement.content = content || announcement.content;

    await announcement.save();

    res.json({
      success: true,
      message: "Announcement updated successfully",
      announcement,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;

    const announcement = await Announcement.findByPk(id);
    if (!announcement) {
      return res.status(404).json({ error: "Announcement not found" });
    }


    if (announcement.instituteId !== req.user.instituteId) {
      return res.status(403).json({ error: "Access denied" });
    }

    await announcement.destroy();

    res.json({
      success: true,
      message: "Announcement deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
