import { Router } from "express";
import { shortenUrl } from "../controllers/shortenController.js";

const router = Router();

router.post("/shorten", shortenUrl);

export default router