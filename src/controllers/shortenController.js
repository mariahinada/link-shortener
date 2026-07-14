import { shortenUrl as shortenLink } from "../services/linkService.js";

export async function shortenUrl(req, res) {
    const url = req.body?.url;

    if (!url) {
        return res.status(400).json({
            error: "URL is required"
        });
    }

    try {
        const result = await shortenLink(url);

        return res.status(201).json({
            originalUrl: result.originalUrl,
            shortCode: result.shortCode,
            shortUrl: `http://localhost:3000/${result.shortCode}`
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}