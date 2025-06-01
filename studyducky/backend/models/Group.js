import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const groupSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["study", "project"], required: true },
	module: { type: String, required: true },

	members: [
		{
			user: { type: Types.ObjectId, ref: "User" },
			availability: { type: String, default: "Not specified" },
		},
	],

	messages: [{ type: Types.ObjectId, ref: "Message" }],
	createdAt: { type: Date, default: Date.now },
});

export default model("Group", groupSchema);
