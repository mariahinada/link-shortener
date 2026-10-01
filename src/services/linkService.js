import { customAlphabet } from "nanoid";

import {
  createLink,
  findLinkByCode,
  incrementAccessCount
} from "../repositories/linkRepository.js";

const generateCode = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

function isValidUrl(url) {
  try {
    const parsedUrl = new URL(url);

    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
}

export async function shortenUrl(url) {
  if (!isValidUrl(url)) {
    const error = new Error("Invalid URL");
    error.code = "INVALID_URL";
    throw error;
  }

  const shortCode = generateCode();

  const link = await createLink({
    originalUrl: url,
    shortCode,
  });

  return link;
}

export async function getOriginalUrl(shortCode) {
  const link = await findLinkByCode(shortCode);

  if (!link) {
    return undefined;
  }

  await incrementAccessCount(link.id);

  return link.originalUrl;
}