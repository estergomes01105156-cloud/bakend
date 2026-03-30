import { Router } from "express";

import { authentication } from "./middlewares/authentication";

import alunosController from "./controllers/alunos";
import cursosController from "./controllers/cursos";
import funcionariosControllers from "./controllers/funcionarios"


const routes = Router();


routes.get("/", (request, response) =>
    response.status(200).json({ success: true })
);


routes.get("/alunos", authentication, alunosController.list);
routes.get("/alunos/:id", authentication, alunosController.getById);
routes.post("/alunos", authentication, alunosController.create);
routes.put("/alunos/:id", authentication, alunosController.update);
routes.delete("/alunos/:id", authentication, alunosController.delete);
routes.post("/matriculas", authentication, alunosController.matricular);
routes.delete("/matriculas", authentication, alunosController.desmatricular);

routes.get("/cursos", authentication, cursosController.list);
routes.get("/cursos/:id", authentication, cursosController.getById);
routes.post("/cursos", authentication, cursosController.create);
routes.put("/cursos/:id", authentication, cursosController.update);
routes.delete("/cursos/:id", authentication, cursosController.delete);

routes.post("/funcionarios/login", funcionariosControllers.login);
routes.get("/funcionarios", authentication, funcionariosControllers.list);
routes.get("/funcionarios/:id", authentication, funcionariosControllers.getById);
routes.post("/funcionarios", authentication, funcionariosControllers.create);
routes.put("/funcionarios/:id", authentication, funcionariosControllers.update);
routes.delete("/fumcionarios/:id", authentication, funcionariosControllers.delete);


export default routes;
