import express from "express";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";
import User from "../models/User.js";

const router = express.Router();

router.get('/:groupId/studyroom', async (req, res) => {
    const { groupId } = req.params;
    const { type } = req.query;

    try {
        let group;

        if (type === 'study') {
            group = await StudyGroup.findById(groupId).populate('members.user', 'name avatar_color');
        } else if (type === 'project') {
            group = await ProjectGroup.findById(groupId).populate('members.user', 'name avatar_color');
        } else {
            return res.status(400).json({ error: "Missing or invalid group type" });
        }

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        console.log("Populated members:", group.members);

        const users = group.members.map(member => ({
            id: member.user._id,
            name: member.user.name,
            avatar_color: member.user.avatar_color || 'yellow'
        }));

        res.json({ users });
    } catch (err) {
        console.error('Error fetching studyroom users:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
