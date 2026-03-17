import {Request, Response} from "express";

import {prisma} from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { request } from "node:http";
import { Prisma } from "../../generated/prisma/client";



export default {
    list: async (request: Request, response: Response) => {
        try {
            const users = await prisma.alunos.findMany();

        return response.status(200).json(users);

        } catch (e: any) {
             if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code], 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }
    },
    create: async (request: Request, response: Response) => {
        try{
            const { nome, idade, cpf, email } = request.body;
        const users = await prisma.alunos.create({
            data: {
                nome ,
                idade ,
                cpf ,
                email 
            },
        });
             return response.status(201).json(users);

        }catch (e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code], 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
 
        }
    },

    update: async (request: Request, response: Response) => {
        try{
             const {id} = request.params;
        const {nome, idade, cpf, email} = request.body;
        const users = await prisma.alunos.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                idade,
                cpf, 
                email,
            }
        });

return response.status(200).json(users);
    } catch (e){
         if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code], 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
    }


        },


    getById: async (request: Request, response: Response) => {

        try{
            const {id } = request.params;
        const user = await prisma.alunos.findUnique({
            where:{
                id: +id

            }

        });
        return response.status(200).json(user);

        }catch(e){
            if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code], 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
        }

    },
    delete: async (request: Request, response: Response) => {

        try{
            const {id} = request.params;

        const users = await prisma.alunos.delete({
            where: {
                id: Number(id)
            },

        });

        return response.status(200).json(users);
    }catch(e){
         if(e instanceof Prisma.PrismaClientKnownRequestError){
                //@ts-ignore
            return response.status(prismaErrorCodes[e.code] || 500).json(e.message);

            }

            return response.status(500).json("Unkown error. try again later");
    }


        }


};
 