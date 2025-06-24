import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const studyGroupSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["study"], required: true },
	module: { type: String, required: true },
	calls: { type: String, enum: ["presence", "occasional", "checkins"], required: true },
	when: { type: String, enum: ["morn", "aftn", "eve"], required: true },
	groupSize: { type: String, enum: ["2-3", "4-5", "6+"], required: true },
	notes: { type: String, enum: ["yes", "no"], required: true },
	VSR: { type: String, enum: ["daily", "few times", "exams"], required: true },
	duration: { type: String, enum: ["less than 1", "1-2", "2"], required: true },
 
	members: [
		{
			user: { type: Types.ObjectId, ref: "User" }
		},
	],

	messages: [{ type: Types.ObjectId, ref: "Message" }],
	createdAt: { type: Date, default: Date.now },
});

export default model("StudyGroup", studyGroupSchema);
