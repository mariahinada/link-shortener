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