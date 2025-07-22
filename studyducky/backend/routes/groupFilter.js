import express from "express";
import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

router.post("/groupfilter", async (req, res) => {

    const { googleId, type, module, tutorial } = req.body;

    try {
        const user = await User.findOne({ googleId });
        if (!user) return res.status(404).json({ error: "User not found" });

        let matched = [];

        if (type === "study") {
            console.log("Incoming module:", module);
            matched = await StudyGroup.find({module});
            console.log("Matched groups from DB:", matched);
            matched = matched.filter(group => !group.members.some(member => member.user.equals(user._id)));
            matched = matched.map((group) => {
                let score = 0;
                if (group.calls === req.body.calls) score += 50 / 3;
                if (group.when === req.body.when) score += 50 / 3;
                if (group.groupSize === req.body.groupSize) score += 50 / 3;
                if (group.notes === req.body.notes) score += 50 / 3;
                if (group.VSR === req.body.VSR) score += 50 / 3;
                if (group.duration === req.body.duration) score += 50 / 3;
                score = Math.round(score);
                return { group, score };
            });
        } else if (type === "project") {
            const normalizedTutorial = req.body.tutorial.replace(/\s+/g, "").toUpperCase();
            matched = await ProjectGroup.find({module, tutorial: normalizedTutorial});
            matched = matched.filter(group => !group.members.some(member => member.user.equals(user._id)));
            matched = matched.map((group) => {
                let score = 0;
                score += (4 - Math.abs(Number(group.commitment) - Number(req.body.commitment))) 
                / 4 * 25;
                if (group.meeting === req.body.meeting) score += 25;
                if (group.pace === req.body.pace) score += 25;
                const daysScore = group.workSlots.filter((d) => req.body.workSlots.includes(d))
                .length / group.workSlots.length * 25;
                score += daysScore;
                score = Math.round(score);
                return { group, score };
            });
        } else {
            return res.status(400).json({ error: "Invalid group type" });
        }
        matched.sort((a, b) => b.score - a.score);
        res.json({ message: "Matched successfully", group: matched });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
