import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

const app = express();

// const username = "ayushjain160899_db_user";
// const password = "MATu1ZuxEfoEuuyv";
// qzqUM8T1O2aYHCfz

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
dotenv.config();

console.log("Mongo username - ", process.env.mongodb_username);

const uri = `mongodb+srv://ayushjain160899_db_user:qzqUM8T1O2aYHCfz@audit-calculator.gc7qqki.mongodb.net/?appName=audit-calculator`;

const client = mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.error("MongoDB connection error:", err);
	});

const logSchema = new mongoose.Schema({
	timestamp: { type: String, required: true },
	action: { type: String, required: true },
	value: { type: String, required: true },
});

const Log = mongoose.model("Log", logSchema);

// Routes
app.get("/", (req, res) => {
	res.send("Welcome to my Express App 🎉");
});

app.post("/api/logs", async (req, res) => {
	try {
		const { action, value } = req.body;
		// Validation
		if (!action || !value) {
			return res.status(400).json({ error: "All fields are required" });
		}
		// Create new Log
		const newLog = new Log({
			timestamp: new Date().toISOString(),
			action,
			value,
		});
		// Save to DB
		const savedLog = await newLog.save();
		// Send response
		res.status(201).json({
			state: true,
			message: "Log saved successfully",
			data: savedLog,
		});
	} catch (error) {
		console.error("Error saving log:", error);
		res.status(500).json({ state: false, error: "Failed to save log" });
	}
});

app.get("/api/logs", async (req, res) => {
	try {
		const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
		res.status(200).json({
			state: true,
			message: "Logs fetched successfully",
			data: logs,
		});
	} catch (error) {
		console.error("Error fetching logs:", error);
		res.status(500).json({ state: false, error: "Failed to fetch logs" });
	}
});

// Server
const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
