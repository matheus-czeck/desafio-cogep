import { Request, Response } from 'express';
import * as servicePeople from '../service/people.service';
import { People } from '../../models/people';
import { Activities } from '../../models/activities';

export const peopleCreate = async (req: Request, res: Response) => {
  try {
    const people = await servicePeople.createPeople(req.body);
    res.status(201).json(people);
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    res.status(500).json({ error: 'Erro ao criar pessoa.' });
  }
};

export const listarPessoas = async (_req: Request, res: Response) => {
  try {
    const people = await servicePeople.peopleList();
    res.status(200).json(people);
  } catch (error) {
    console.error('Erro ao listar pessoas:', error);
    res.status(500).json({ error: 'Erro ao listar pessoas.' });
  }
};

export const getPeopleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const people = await People.findByPk(id, {
      include: [
        {
          model: Activities,
          as: 'atividadesPessoa', // Deve ser igual ao alias configurado no relacionamento
        },
      ],
    });

    if (!people) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    res.json(people);
  } catch (err) {
    console.error('Erro ao obter detalhes da pessoa:', err);
    res.status(500).json({ error: 'Erro ao obter detalhes da pessoa.' });
  }
};
