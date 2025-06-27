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
			folderId,
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
				folderId,
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
				folderId,
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

export default router;
