import { Router} from "express";

import alunosController from "./controllers/aluno";

const routes = Router();

routes.get("/", (request, respons) => respons.status(200).json({success: true}),);

routes.get("/aluno", (request, respons) => alunosController.list(request, respons));

export default routes;