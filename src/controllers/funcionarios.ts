import { Request, Response } from "express"; 
import { prisma } from "../../config/prisma";
import {handleErrors} from "../helpers/handleError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export default {
    login: async (request: Request, response: Response) => {
        try {
            const { email, senha } = request.body;
            const employee = await prisma.funcionarios.findUnique({
                where: {
                    email,
                },
            });


            if (!employee || !bcrypt.compareSync(senha, employee.senha)) {
                return response.status(401).json("Email e/ou senha inválidos");
            }


            const token = jwt.sign(employee, process.env.JWT_SECRET!);


            return response.status(200).json({ access_token: token });
        }catch (e) {
            return handleErrors(e, response);
        }
    },




    list: async (request: Request, response: Response) => {
    try {
        const employees = await prisma.funcionarios.findMany();
        return response.status(200).json(employees);

    } catch (e) {
        return handleErrors(e, response);
    }
},

    create: async (request: Request, response: Response) => { 
        try {
            const { nome, senha, email, admin } = request.body;
            const employees = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha: bcrypt.hashSync(senha, +process.env.BCRYPT_ROUNDS!),
                    admin
                },
            });
            return response.status(201).json(employees);
        } catch (e) {
            return handleErrors(e, response);

        }
    },
   crete: async (request: Request, response: Response) => { 
        try {
            const { nome, senha, email, admin } = request.body;
            const employees = await prisma.funcionarios.create({
                data: {
                    nome,
                    email,
                    senha,
                    admin
                },
            });
            return response.status(201).json(employees);
        } catch (e) {
            return handleErrors(e, response);

    }
    },
update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, admin, email } = request.body;
            const employees = await prisma.funcionarios.update({


                where: { id: +id },
                data: {
                    nome,
                    email,
                    admin
                },
            });
            return response.status(200).json(employees);
        } catch (e) {
            return handleErrors(e, response);


        }
    },
    getById: async (request: Request, response: Response) => {

        try {
            const { id } = request.params; 
            const employees = await prisma.funcionarios.findUnique({ 
                where: { 
                    id: +id 
                },
            });
            return response.status(200).json(employees) 
        } catch (e) {
            return handleErrors(e, response);

            }
    },
    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const employees = await prisma.funcionarios.delete({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(employees);

        } catch (e) {
            return handleErrors(e, response);

        }

    },
};
        