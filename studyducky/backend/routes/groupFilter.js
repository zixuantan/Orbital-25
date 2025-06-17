import express from "express";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

router.post("/groupfilter", async (req, res) => {
    console.log("POST /api/groupfilter hit");
    console.log("Request body:", req.body);

    const { type, module, tutorial } = req.body;

    try {
        let matched = [];

        if (type === "study") {
            matched = await StudyGroup.find({module});
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
            matched = await ProjectGroup.find({module, tutorial});
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
