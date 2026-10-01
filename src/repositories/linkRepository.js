import prisma from "../lib/prisma.js";

export async function createLink(linkData) {
  return prisma.link.create({
    data: linkData,
  });
}

export async function findLinkByCode(shortCode) {
  return prisma.link.findUnique({
    where: {
      shortCode
    }
  });
}

export async function incrementAccessCount(id) {
  return prisma.link.update({
    where: {
      id
    },
    data: {
      accessCount: {
        increment: 1
      }
    }
  });
}