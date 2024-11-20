import { Router, Request, Response } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import { Pessoa } from '../models/pessoas';
import { Atividade } from '../models/atividades'; 

const router = Router();


router.use(authenticate);


router.get('/', async (req: Request, res: Response) => {
  try {
    const pessoas = await Pessoa.findAll(); 

    console.log('Lista de pessoas retornada:', pessoas);
    res.json(pessoas); 
  } catch (err) {
    console.error('Erro ao obter pessoas:', err);
    res.status(500).json({ error: 'Erro ao obter pessoas.' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pessoa = await Pessoa.findByPk(id, {
      include: [
        {
          model: Atividade,
          as: 'atividades',
        },
      ],
    });

    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    res.json(pessoa); 
  } catch (err) {
    console.error('Erro ao obter detalhes da pessoa:', err);
    res.status(500).json({ error: 'Erro ao obter detalhes da pessoa.' });
  }
});


router.post('/', async (req: Request, res: Response) => {
  const { name, phone, email, address } = req.body;

  try {
    console.log('Dados recebidos no backend:', req.body);

    const novaPessoa = await Pessoa.create({ name, phone, email, address: JSON.stringify(address) });
    res.status(201).json(novaPessoa);
  } catch (err) {
    res.status(400).json({ error: 'Erro ao criar pessoa' });
  }
});

export default router;
