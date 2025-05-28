const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const groupSchema = new Schema({
	name: {
		type: String,
		required: true,
	},

	type: {
		type: String,
		enum: ["study", "project"], // group type
		required: true,
	},

	module: {
		type: String,
		required: true,
	},

	members: [
		{
			type: Types.ObjectId,
			ref: "User",
		},
	],

	messages: [
		{
			type: Types.ObjectId,
			ref: "Message",
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Group", groupSchema);
