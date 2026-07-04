import { createShortUrl } from "../services/shortenService.js";

export function shortenUrl(req, res) {
    const url = req.body?.url;

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    const result = createShortUrl(url);

    return res.status(201).json(result);
}