import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const studyGroupSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, enum: ["study"], required: true },
	module: { type: String, required: true },
	calls: { type: String, enum: ["Just having presence/accountability", "Occasional discussions", "Daily check ins"], required: true },
	when: { type: String, enum: ["Morning (7AM - 12PM)", "Afternoon (12PM - 5PM)", "Evening (5PM - 10PM)"], required: true },
	groupSize: { type: String, enum: ["2-3", "4-5", "6+"], required: true },
	notes: { type: String, enum: ["Yes", "No"], required: true },
	VSR: { type: String, enum: ["Daily", "A few times a week", "Mostly near exams"], required: true },
	duration: { type: String, enum: ["Less than 1 hour", "1-2 hours", "2 hours"], required: true },
	folderId: { type: String, required: true },
 
	members: [
		{
			user: { type: Types.ObjectId, ref: "User" }
		},
	],

	messages: [{ type: Types.ObjectId, ref: "Message" }],
	createdAt: { type: Date, default: Date.now },
});

export default model("StudyGroup", studyGroupSchema);
