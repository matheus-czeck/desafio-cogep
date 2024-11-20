import { Router, Request, Response } from "express";
import { authenticate } from "../../services/middlewares/auth.middleware";
import { People } from "../../models/people";
import { getPersonById } from "../../services/controllers/people.controller";

const router = Router();

router.use(authenticate);

router.get("/", async (req: Request, res: Response) => {
  try {
    const people = await People.findAll();

    console.log("Lista de pessoas retornada:", people);
    res.json(people);
  } catch (err) {
    console.error("Erro ao obter pessoas:", err);
    res.status(500).json({ error: "Erro ao obter pessoas." });
  }
});

router.get("/:id", getPersonById)

router.post("/", async (req: Request, res: Response) => {
  const { name, phone, email, address } = req.body;

  try {
    console.log("Dados recebidos no backend:", req.body);

    const novaPessoa = await People.create({
      name,
      phone,
      email,
      address: JSON.stringify(address),
    });
    res.status(201).json(novaPessoa);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar pessoa" });
  }
});

export default router;
