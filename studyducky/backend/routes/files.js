import express from "express";
import multer from "multer";
import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";
import File from "../models/File.js";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

const auth = new google.auth.GoogleAuth({
	keyFile: isProd
		? "/etc/secrets/studyduckyAcc.json"
		: "config/studyduckyAcc.json",
	scopes: ["https://www.googleapis.com/auth/drive"],
});

console.log("Using keyFile from:", isProd ? "/etc/secrets" : "config");

const drive = google.drive({ version: "v3", auth });

async function uploadFile(filePath, fileName, mimeType, folderId) {
	const fileMetadata = {
		name: fileName,
		parents: [folderId],
	};

	const media = {
		mimeType: mimeType,
		body: fs.createReadStream(filePath),
	};

	const file = await drive.files.create({
		resource: fileMetadata,
		media: media,
		fields: "id, webViewLink",
	});

	fs.unlinkSync(filePath);
	return file.data.webViewLink;
}

router.post("/upload/:folderId", upload.single("file"), async (req, res) => {
	try {
		const folderId = req.params.folderId;
		const filePath = req.file.path;
		const fileName = req.file.originalname;
		const mimeType = req.file.mimetype;

		const fileLink = await uploadFile(
			filePath,
			fileName,
			mimeType,
			folderId
		);
		await File.create({
			folderId: folderId,
			name: fileName,
			url: fileLink,
			owner: req.user.googleId,
			date: new Date(),
		});
		res.json({ fileLink });
	} catch (err) {
		console.error("Upload error:", err);
		res.status(500).json({ error: "Failed to upload file" });
	}
});

router.get("/list-files/:folderId", async (req, res) => {
	try {
		const folderId = req.params.folderId;

		const result = await drive.files.list({
			q: `'${folderId}' in parents and trashed=false`,
			fields: "files(id, name, webViewLink)",
		});

		res.json({ files: result.data.files });
	} catch (err) {
		console.error("Error listing files:", err);
		res.status(500).json({ error: "Failed to list files" });
	}
});

router.get("/files/group/:groupId", async (req, res) => {
	try {
		const files = await File.find({ groupId: req.params.groupId });

		const filesWithNames = await Promise.all(
			files.map(async (file) => {
				const uploader = await User.findOne({ googleId: file.owner });
				return {
					...file.toObject(),
					uploaderName: uploader?.name || "Unknown",
				};
			})
		);

		res.json(filesWithNames);
	} catch (err) {
		console.error("Error fetching files:", err);
		res.status(500).json({ error: "Failed to fetch files" });
	}
});

export default router;
