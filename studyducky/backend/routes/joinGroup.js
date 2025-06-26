import express from "express";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/joingroup/:groupId", async (req, res) => {
	try {
		const groupId = req.params.groupId;
		const { type } = req.body;

		console.log("req.user in /joingroup:", req.user);

		const user = req.user; // Get logged-in user from session
		if (!user) return res.status(401).json({ error: "Not logged in" });
		console.log("Joining user:", user);
		if (!user) return res.status(404).json({ error: "User not found" });
		const groupType = type === "study" ? StudyGroup : ProjectGroup;
		const group = await groupType.findById(groupId);

		// add user to group.members only if user is not alr present
		const alreadyMember = group.members.some(
			(m) => m.user.toString() === user._id.toString()
		);
		if (!alreadyMember) {
			group.members.push({ user: user._id });
			await group.save();
		}

		//adding groupids to users respective group array
		if (type === "study") {
			await User.findByIdAndUpdate(user._id, {
				$addToSet: { studyGroups: group._id },
			});
		} else if (type === "project") {
			await User.findByIdAndUpdate(user._id, {
				$addToSet: { projectGroups: group._id },
			});
		}
		res.json({ message: "Joined group:", groupId });
	} catch (err) {
		console.error("Join group error:", err);
		res.status(500).json({ error: "Server error" });
	}
});

export default router;
