import { Router } from "express";
import { shortenUrl, redirectToUrl } from "../controllers/shortenController.js";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", redirectToUrl);

export default router
