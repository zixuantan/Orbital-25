import mongoose from "mongoose";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB connected to DB: ${conn.connection.name}`);
	} catch (err) {
		console.error("MongoDB connection failed:", err.message);
		process.exit(1);
	}
};

export default connectDB;
