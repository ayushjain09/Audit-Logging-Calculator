import LogService from "../services/logService.js";

export async function createLogsAction(req, res) {
	try {
		const { action, value } = req.body;

		if (!action || !value) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const savedLog = await LogService.createLog(action, value);

		return res.status(200).json({
			state: true,
			message: "Log saved successfully",
			data: savedLog,
		});
	} catch (error) {
		console.error("Error saving log:", error);
		return res
			.status(500)
			.json({ state: false, error: "Failed to save log" });
	}
}

export async function getLogsAction(req, res) {
	try {
		const logs = await LogService.getLogs(100);

		return res.status(200).json({
			state: true,
			message: "Logs fetched successfully",
			data: logs,
		});
	} catch (error) {
		console.error("Error fetching logs:", error);
		return res
			.status(500)
			.json({ state: false, error: "Failed to fetch logs" });
	}
}
