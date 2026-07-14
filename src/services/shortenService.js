import { nanoid } from "nanoid";

export function createShortUrl(url) {
    const shortCode = nanoid(6)

    return {
        originalUrl: url,
        shortUrl: `http://localhost:3000/${shortCode}`
    }
}