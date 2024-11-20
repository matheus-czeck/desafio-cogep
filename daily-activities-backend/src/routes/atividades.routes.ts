import { Router, Request, Response } from 'express';
import { Atividade } from '../models/atividades';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', async (req: Request, res: Response) => {
  try {
    const atividades = await Atividade.findAll();
    res.json(atividades);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao obter atividades.' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const novaAtividade = await Atividade.create({ name, description, startDate, endDate });
    res.status(201).json(novaAtividade);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar atividade.' });
  }
});

export default router;
