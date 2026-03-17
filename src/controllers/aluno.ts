import {Request, Response} from "express";

import {prisma} from "../../config/prisma";


export default {
    list: async (request: Request, respons: Response) => {
        const users = await prisma.alunos.findMany();

        return respons.status(200).json(users);
    },
}