import { Request, Response } from 'express';
import * as activityService from '../../services/service/activities.service';

export const activitiesCreate = async (req: Request, res: Response) => {
  try {
    const activities = await activityService.createActivities(req.body);
    res.status(201).json(activities);
  } catch (error) {
    console.error('Erro ao criar atividade:', error);
    res.status(500).json({ error: 'Erro ao criar atividade.' });
  }
};

export const listPeoleForActivities = async (req: Request, res: Response) => {
  const { personId } = req.params;
  try {
    const activities = await activityService.listPeoleForActivities(Number(personId));
    res.status(200).json(activities);
  } catch (error) {
    console.error('Erro ao listar atividades por pessoa:', error);
    res.status(500).json({ error: 'Erro ao listar atividades por pessoa.' });
  }
};
