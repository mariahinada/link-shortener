import { customAlphabet } from "nanoid";
import { createLink, findLinkByCode } from "../repositories/linkRepository.js";

const generateCode = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

export async function shortenUrl(url) {
  const shortCode = generateCode();

  const link = await createLink({
    originalUrl: url,
    shortCode,
  });

  return link;
}

export async function getOriginalUrl(shortCode) {
  const link = await findLinkByCode(shortCode);
  return link?.originalUrl;
}