import express from "express";
import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

// Create group
router.post("/", async (req, res) => {
	try {
		const { name, type, module, creatorId } = req.body;

		// Determine which model to use
		const GroupModel =
			type === "study"
				? StudyGroup
				: type === "project"
				? ProjectGroup
				: null;

		if (!GroupModel) {
			return res.status(400).json({ message: "Invalid group type" });
		}

		const newGroup = new GroupModel({
			name,
			type,
			module,
			members: [
				{
					user: creatorId,
					availability: "Not specified",
				},
			],
		});

		await newGroup.save();
		res.status(201).json(newGroup);
	} catch (err) {
		console.error("Group creation error:", err);
		res.status(500).json({ message: "Failed to create group" });
	}
});

// Join group
router.post("/:id/join", async (req, res) => {
	try {
		const groupId = req.params.id;
		const { userId, availability } = req.body;

		const group = await Group.findById(groupId);
		if (!group) return res.status(404).json({ message: "Group not found" });

		const alreadyMember = group.members.some(
			(m) => m.user.toString() === userId
		);
		if (!alreadyMember) {
			group.members.push({
				user: userId,
				availability: availability || [],
			});
			await group.save();
		}

		res.status(200).json({ message: "Joined group", group });
	} catch (err) {
		console.error("Join group error:", err);
		res.status(500).json({ message: "Failed to join group" });
	}
});

// fetch groups by type
router.get("/by-type", async (req, res) => {
	const { type } = req.query;

	try {
		let groups;
		if (type === "study") {
			groups = await StudyGroup.find();
		} else if (type === "project") {
			groups = await ProjectGroup.find();
		} else {
			return res.status(400).json({ message: "Invalid group type" });
		}

		res.json(groups);
	} catch (err) {
		console.error("Error fetching typed groups:", err);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
