import { PrismaClient } from '@prisma/client';
import {IncomingMessage, ServerResponse} from "node:http";

const prisma = new PrismaClient();

export default {
    '/' : {
        async get(req : IncomingMessage, res : ServerResponse) {
            const sessions = await prisma.sessions.findMany();
            res.end(
                JSON.stringify({
                    'success': true,
                    'data': sessions
                })
            );
        }
    },

    '/addSession' : {
        async post(req : IncomingMessage, res : ServerResponse) {
            const data = JSON.parse(req.toString());
            const session = await prisma.sessions.create({
                data: data
            });
            res.end(
                JSON.stringify({
                    'success': true,
                    'data': session
                })
            );
        }
    }
}