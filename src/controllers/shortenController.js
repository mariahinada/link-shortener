import { shortenUrl as shortenLink, getOriginalUrl } from "../services/linkService.js";

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

export async function redirectToUrl(req, res) {
    const { shortCode } = req.params;

    try {
        const originalUrl = await getOriginalUrl(shortCode);

        if (!originalUrl) {
            return res.status(404).json({
                error: "URL not found"
            });
        }

        return res.redirect(originalUrl);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Internal server error"
        });
    }
}
