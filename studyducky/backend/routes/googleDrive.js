import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const router = express.Router();

const auth = new google.auth.GoogleAuth({
	keyFile: isProd
		? "/etc/secrets/studyduckyAcc.json"
		: "config/studyduckyAcc.json",
	scopes: ["https://www.googleapis.com/auth/drive"],
});

console.log("Using keyFile from:", isProd ? "/etc/secrets" : "config");

const drive = google.drive({ version: "v3", auth });

const PARENT_FOLDER_ID = process.env.PARENT_DRIVE_FOLDER_ID;

router.post("/create-folder", async (req, res) => {
	try {
		console.log("Incoming req.body:", req.body);
		const { groupName } = req.body;

		if (!groupName) {
			return res.status(400).json({ error: "Missing Name" });
		}

		const folder = await drive.files.create({
			resource: {
				name: groupName + "_" + uuidv4().slice(0, 8),
				mimeType: "application/vnd.google-apps.folder",
				parents: [PARENT_FOLDER_ID],
			},
			fields: "id, name",
		});

		const folderId = folder.data.id;

		await drive.permissions.create({
			fileId: folderId,
			requestBody: {
				type: "user",
				role: "writer",
				emailAddress: "joliengxuan@gmail.com",
			},
		});

		res.json({
			folderId: folderId,
			folderName: folder.data.name,
		});
	} catch (err) {
		console.error("Error creating group folder:", err);
		res.status(500).json({ error: "Failed to create folder" });
	}
});

export default router;
