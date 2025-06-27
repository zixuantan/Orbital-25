import mongoose from "mongoose";
const { Schema, model } = mongoose;

const fileSchema = new Schema({
    folderId: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    owner: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

export default model("File", fileSchema);