import { Request, Response } from 'express';
import peopleService from '../service/people.service';

export const createPerson = async (req: Request, res: Response) => {
  try {
    const people = await peopleService.createPeople(req.body);
    
    res.status(201).json(people);
    
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    res.status(500).json({ error: 'Erro ao criar pessoa.' });
  }
};

export const listarPessoas = async (_req: Request, res: Response) => {
  try { 
    const people = await peopleService.peopleList()
    res.status(200).json(people);
  } catch (error) {
    console.error('Erro ao listar pessoas:', error);
    res.status(500).json({ error: 'Erro ao listar pessoas.' });
  }
};

export const getPersonById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try { 
    const person = await peopleService.getPersonById(id);
    res.json(person);
  } catch (err) {
    console.error('Erro ao obter detalhes da pessoa:', err);
    res.status(500).json({ error: 'Erro ao obter detalhes da pessoa.' });
  }
};

const personController = {getPersonById, listarPessoas, createPerson}

export default personController;
