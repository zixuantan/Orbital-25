import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const groupSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["project"], required: true },
	module: { type: String, required: true },
	tutorial: { type: String, enum: ["T1", "T2", "T3"], required: true },
	commitment: { type: String, enum: ["1", "2", "3", "4", "5"], required: true },
	meeting: { type: String, enum: ["morn", "aftn", "eve"], required: true },
	pace: { type: String, enum: ["early", "balanced", "cram"], required: true },
	workSlots: { type: [String], required: true },

	members: [
		{
			user: { type: Types.ObjectId, ref: "User" },
			availability: { type: String, default: "Not specified" },
		},
	],

	messages: [{ type: Types.ObjectId, ref: "Message" }],
	createdAt: { type: Date, default: Date.now },
});

export default model("ProjectGroup", groupSchema);
