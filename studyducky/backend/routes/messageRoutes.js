import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

// send message
router.post("/message", async (req, res) => {
	console.log("Received POST /api/message");
	console.log("Body:", req.body);
	try {
		const { groupId, groupType, senderId, content } = req.body;

		if (!groupId || !groupType || !senderId || !content) {
			return res.status(400).json({ error: "Missing required fields" });
		}

		const message = await Message.create({
			group: groupId,
			groupType,
			sender: senderId,
			content,
		});

		res.status(201).json(message);
	} catch (err) {
		console.error("Message creation error:", err);
		res.status(500).json({ error: "Failed to send message" });
	}
});

// get all messages for group
router.get("/message/:groupType/:groupId", async (req, res) => {
	try {
		const { groupType, groupId } = req.params;

		const messages = await Message.find({
			group: groupId,
			groupType,
		})
			.populate("sender", "name profilePicture")
			.sort({ timestamp: 1 });

		res.json(messages);
	} catch (err) {
		console.error("Fetch message error:", err);
		res.status(500).json({ error: "Failed to fetch messages" });
	}
});

export default router;
