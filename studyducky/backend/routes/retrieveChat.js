import express from "express";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

router.get("/group/:groupId", async (req, res) => {
    const { groupId } = req.params;

    try {
        let group = await StudyGroup.findById(groupId);
        if (!group) {
            group = await ProjectGroup.findById(groupId);
        }
        if (!group) {
            return res.status(404).json({ error: "Group not found" });
        }
        res.json({ group, messages: [] }); //to be changed
    } catch (err) {
        console.error("Error in GET /group/:groupId:", err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
