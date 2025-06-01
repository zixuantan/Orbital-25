import express from "express";
import Group from "../models/Group.js";
import User from "../models/User.js";

const router = express.Router();

// Create group
router.post("/", async (req, res) => {
	try {
		const { name, type, module, creatorId } = req.body;
		const newGroup = new Group({
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

// Get all groups
router.get("/all", async (req, res) => {
	try {
		const groups = await Group.find().populate(
			"members.user",
			"name email"
		);
		res.json(groups);
	} catch (err) {
		console.error("Error fetching groups:", err);
		res.status(500).json({ message: "Failed to retrieve groups" });
	}
});

export default router;



