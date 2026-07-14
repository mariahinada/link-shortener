import { customAlphabet } from "nanoid";
import { createLink } from "../repositories/linkRepository.js";

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