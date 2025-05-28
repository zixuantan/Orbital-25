const mongoose = require("mongoose");
const { Schema, model, Types } = mongoose;

const messageSchema = new Schema({
	group: {
		type: Types.ObjectId,
		ref: "Group",
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

module.exports = mongoose.model("Message", messageSchema);
