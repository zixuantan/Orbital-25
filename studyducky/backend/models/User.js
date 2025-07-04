import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const userSchema = new Schema(
	{
		googleId: {
			type: String,
			required: true,
			unique: true,
		},

		email: {
			type: String,
			required: true,
			unique: true,
		},

		name: {
			type: String,
			required: true,
		},

		profilePicture: String,

		year: Number,
		major: String,
		modulesTaken: [String],

		studyStatistics: {
			totalHours: { type: Number, default: 0 },
			streak: { type: Number, default: 0 },
		},

		commitmentByModule: {
			type: Map,
			of: Number, // 1–5 for each module
			default: {},
		},

		studyGroups: [{ type: Types.ObjectId, ref: "StudyGroup" }],
		projectGroups: [{ type: Types.ObjectId, ref: "ProjectGroup" }],
	},
	{ timestamps: true }
); 

const User = model("User", userSchema);
export default User;
