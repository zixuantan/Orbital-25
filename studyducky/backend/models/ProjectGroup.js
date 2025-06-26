import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const groupSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["project"], required: true },
	module: { type: String, required: true },
	tutorial: { type: String, enum: ["T1", "T2", "T3"], required: true },
	commitment: { type: String, enum: ["1", "2", "3", "4", "5"], required: true },
	meeting: { type: String, enum: ["Morning (7AM - 12PM)", "Afternoon (12PM - 5PM)", "Evening (5PM - 10PM)"], required: true },
	pace: { type: String, enum: ["Start early", "Balanced pace", "Cram last minute"], required: true },
	workSlots: { type: [String], required: true },

	members: [
		{
			user: { type: Types.ObjectId, ref: "User" }
		},
	],

	messages: [{ type: Types.ObjectId, ref: "Message" }],
	createdAt: { type: Date, default: Date.now },
});

export default model("ProjectGroup", groupSchema);
