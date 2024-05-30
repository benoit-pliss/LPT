import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.time_in_sec) return {
        success: false,
        error: 'time_in_sec not provided'
    }

    const time = await prisma.times.create({
        data: {
            time_in_sec: body.time_in_sec
        }
    })

    return {
        success: true,
        data: time
    }
})