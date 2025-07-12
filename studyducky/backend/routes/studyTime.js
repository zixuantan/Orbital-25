import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/studytime", async (req, res) => {
    const { userId, timeSpent } = req.body; //seconds
    const today = new Date().toISOString().slice(0, 10); 

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });
        console.log("Received timeSpent:", timeSpent);

        user.studyStatistics.totalHours = (user.studyStatistics.totalHours || 0) + timeSpent / 3600;

        //update today seconds
        if (user.studyStatistics?.today?.date === today) {
            user.studyStatistics.today.seconds += timeSpent;
        } else {
            user.studyStatistics.today = {
                date: today,
                seconds: timeSpent,
            };
        }

        await user.save();
        res.json({ success: true });
    } catch (err) {
        console.error("Failed to log study time:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;