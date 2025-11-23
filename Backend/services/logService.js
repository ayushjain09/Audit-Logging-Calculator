import Log from "../models/logModel.js";

async function createLog(action, value) {
	const newLog = new Log({
		timestamp: new Date().toISOString(),
		action,
		value,
	});

	const savedLog = await newLog.save();
	return savedLog;
}

async function getLogs(limit = 100) {
	const logs = await Log.find().sort({ timestamp: -1 }).limit(limit);
	return logs;
}

export default {
	createLog,
	getLogs,
};
