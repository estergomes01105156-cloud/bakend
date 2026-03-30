import { Request, Response } from "express";
import { prisma } from "../../config/prisma";
import prismaErrorCodes from "../../config/prismaErrorCodes.json";
import { Prisma } from "../../generated/prisma/client";
import { handleErrors } from "../helpers/handleError";

export default {

    list: async (request: Request, response: Response) => {
    try {
        const alunos = await prisma.alunos.findMany({
            include: {
                alunosCursos: {
                    include: {
                        cursos: true
                    }
                }
            }
        });


        const resultado = alunos.map(aluno => ({
            id: aluno.id,
            nome: aluno.nome,
            idade: aluno.idade,
            cpf: aluno.cpf,
            email: aluno.email,
            cursos: aluno.alunosCursos.map(c => ({
                id: c.cursos.id,
                nome: c.cursos.nome,
                professor: c.cursos.professor,
                cargaHoraria: c.cursos.cargaHoraria
            }))
        }));


        return response.status(200).json(resultado);


    } catch (e) {
        return response.status(500).json("Erro ao listar alunos");
    }
},


    create: async (request: Request, response: Response) => {
        try {
            const { nome, idade, cpf, email } = request.body;
            const user = await prisma.alunos.create({
                data: {
                    nome,
                    idade,
                    cpf,
                    email
                },
            });
            return response.status(201).json({
                message: "Aluno criado com sucesso",
                data: user
            });
        } catch (e: any) {
        return handleErrors(e, response);

        }
    },


    update: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const { nome, idade, cpf, email } = request.body;
            const user = await prisma.alunos.update({




                where: { id: +id },
                data: {
                    nome,
                    idade,
                    cpf,
                    email
                },
            });
            return response.status(200).json(user);
        } catch (e) {
        return handleErrors(e, response);
        }
    },




    getById: async (request: Request, response: Response) => {


        try {
            const { id } = request.params;
            const user = await prisma.alunos.findUnique({
                where: {
                    id: +id
                },
            });
            return response.status(200).json(user) // retorna o usuário encontrado com status 200
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }
    },


    delete: async (request: Request, response: Response) => {
        try {
            const { id } = request.params;
            const user = await prisma.alunos.delete({
                where: {
                    id: +id
                }
            });
            return response.status(200).json(user);


        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                // @ts-ignore
                return response.status(prismaErrorCodes[e.code] || 500).json(e.message)
            }
            return response.status(500).json("Unkwon error. Try again later");
        }


    },




   matricular: async (request: Request, response: Response) => {
    try {
        const { alunoId, cursosIds } = request.body;

        const matricula = await prisma.alunos.update({
            where: { id: alunoId },
            data: {
                alunosCursos: {
                    create: cursosIds.map((cursoId: number) => ({
                        cursos: {
                            connect: { id: cursoId }
                        }
                    }))
                }
            },
            include: {
                alunosCursos: {
                    include: {
                        cursos: true
                    }
                }
            }
        });

        return response.status(200).json(matricula);
    } catch (e) {
        return handleErrors(e, response);
    }
}
,


desmatricular: async (request: Request, response: Response) => {
    try {
        const { alunoId, cursosIds } = request.body;

        const resultado = await prisma.alunosCursos.deleteMany({
            where: {
                alunosId: alunoId,
                cursosId: {
                    in: cursosIds
                }
            }
        });

        return response.status(200).json({
            message: "Matrículas removidas com sucesso",
            removidos: resultado.count
        });
    } catch (e) {
        console.log(e);
        return response.status(500).json("Erro ao remover matrículas");
    }
},


};