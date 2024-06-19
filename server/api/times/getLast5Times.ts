import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    return prisma.times.findMany({
        orderBy: {
            created_at: "desc"
        },
        take: 5
    });
})