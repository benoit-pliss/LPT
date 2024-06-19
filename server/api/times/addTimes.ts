import { PrismaClient } from '@prisma/client'
import getAo5 from "~/utils/getAo5";
const prisma = new PrismaClient()


export default defineEventHandler(async (event) => {
    const [body] = await Promise.all([readBody(event)])

    if (!body.time_in_sec) return {
        success: false,
        error: 'time_in_sec not provided'
    }

    let ao5: number;

    try {
        ao5 = await getAo5();
    } catch (error) {
        console.error('Error calculating Ao5:', error);
        return {
            success: false,
            error: 'Error calculating Ao5',
        };
    }

    try {
        const time = await prisma.times.create({
            data: {
                time_in_sec: body.time_in_sec,
                ao_cinq: ao5,
            },
        });

        return {
            success: true,
            data: time,
        };
    } catch (error) {
        console.error('Error creating time entry:', error);
        return {
            success: false,
            error: 'Error creating time entry',
        };
    }
})