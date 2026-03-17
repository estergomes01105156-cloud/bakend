import { Router} from "express";

import alunosController from "./controllers/alunos";

const routes = Router();

routes.get("/", (request, response) => response.status(200).json({success: true}),
);

routes.get("/alunos", alunosController.list);
routes.get("/aluno/:id", alunosController.getById);
routes.post("/alunos", alunosController.create);
routes.put("/alunos/:id", alunosController.update);
routes.delete("/alunos/:id", alunosController.delete)

routes.get("/cursos", alunosController.list);
routes.get("/cursos/:id", alunosController.getById);
routes.post("/cursos", alunosController.create);
routes.put("/cursos/:id", alunosController.update);
routes.delete("/cursos/:id", alunosController.delete)

export default routes;


// ou abreviar assim routes.post("/aluno", alunosController.create);
//alunosController.list(request, response),);
