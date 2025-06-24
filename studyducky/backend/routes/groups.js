import express from "express";
import User from "../models/User.js";
import StudyGroup from "../models/StudyGroup.js";
import ProjectGroup from "../models/ProjectGroup.js";

const router = express.Router();

// Create group
router.post("/", async (req, res) => {
	try {
		const {
			name,
			type,
			module,
			creatorId,
			// study group
			calls,
			when,
			groupSize,
			notes,
			VSR,
			duration,
			// project group
			tutorial,
			commitment,
			meeting,
			pace,
			workSlots,
		} = req.body;

		let newGroup;

		if (type === "study") {
			newGroup = new StudyGroup({
				name,
				type,
				module,
				calls,
				when,
				groupSize,
				notes,
				VSR,
				duration,
				members: [
					{
						user: creatorId,
					},
				],
			});
		} else if (type === "project") {
			newGroup = new ProjectGroup({
				name,
				type,
				module,
				tutorial,
				commitment,
				meeting,
				pace,
				workSlots,
				members: [
					{
						user: creatorId,
					},
				],
			});
		} else {
			return res.status(400).json({ message: "Invalid group type" });
		}

		// save group to generate new group id
		await newGroup.save();

		// update user's group list with new group id
		await User.findByIdAndUpdate(creatorId, {
			$addToSet: {
				[type === "study" ? "studyGroups" : "projectGroups"]:
					newGroup._id,
			},
		});

		res.status(201).json(newGroup);
	} catch (err) {
		console.error("Group creation error:", err);
		res.status(500).json({ message: "Failed to create group" });
	}
});

// Join group
/* router.post("/:id/join", async (req, res) => {
	try {
		const groupId = req.params.id;
		const { userId } = req.body;

		const group = await Group.findById(groupId);
		if (!group) return res.status(404).json({ message: "Group not found" });

		const alreadyMember = group.members.some(
			(m) => m.user.toString() === userId
		);
		if (!alreadyMember) {
			group.members.push({
				user: userId
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
	const { type, module } = req.query;

	try {
		let groups;
		if (type === "study") {
			groups = await StudyGroup.find(module ? { module } : {});
		} else if (type === "project") {
			groups = await ProjectGroup.find(module ? { module } : {});
		} else {
			return res.status(400).json({ message: "Invalid group type" });
		}

		res.json(groups);
	} catch (err) {
		console.error("Error fetching typed groups:", err);
		res.status(500).json({ message: "Server error" });
	}
});
*/
export default router;
