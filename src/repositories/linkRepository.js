import prisma from "../lib/prisma.js";

export async function createLink(linkData) {
    return prisma.link.create({
        data: linkData,
    });
}