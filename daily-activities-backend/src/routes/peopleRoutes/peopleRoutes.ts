import { Router } from "express";
import { authenticate } from "../../services/middlewares/auth.middleware";
import personController from "../../services/controllers/people.controller";

const router = Router();

router.use(authenticate);

router.get("/", personController.listarPessoas);                

router.get("/:id", personController.getPersonById)

router.post("/", personController.createPerson);

export default router;
