import { Router } from "express";
import {
	createLogsAction,
	getLogsAction,
} from "../controllers/logController.js";

const router = Router();

router.get("/", getLogsAction);
router.post("/", createLogsAction);

export default router;
