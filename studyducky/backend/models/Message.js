import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const messageSchema = new Schema({
	group: {
		type: Types.ObjectId,
		refPath: "groupType",
		required: true,
	},
	groupType: {
		type: String,
		enum: ["study", "project"],
		required: true,
	},
	sender: {
		type: Types.ObjectId,
		ref: "User",
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

export default model("Message", messageSchema);
