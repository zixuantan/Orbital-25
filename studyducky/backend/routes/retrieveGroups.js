import express from "express";
import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

router.get("/user/:googleId/groups", async (req, res) => {
    try {
        const { googleId } = req.params;
        console.log("Fetching groups for googleId:", googleId);
        const user = await User.findOne({ googleId: googleId })
            .populate("studyGroups")
            .populate("projectGroups");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({
            studyGroups: user.studyGroups || [],
            projectGroups: user.projectGroups || [],
        });
    } catch (err) {
        console.error("Error fetching user groups:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
