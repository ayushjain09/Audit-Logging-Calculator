import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
	timestamp: { type: String, required: true },
	action: { type: String, required: true },
	value: { type: String, required: true },
});

const Log = mongoose.model("Log", logSchema);

export default Log;
