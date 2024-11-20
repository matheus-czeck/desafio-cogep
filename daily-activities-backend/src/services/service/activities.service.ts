import { Activities } from '../../models/activities';

// Criar uma nova atividade
export const createActivities = async (data: any) => {
  return await Activities.create(data);
};

// Listar todas as atividades
export const activitiesList = async () => {
  return await Activities.findAll();
};

// Listar atividades por pessoa
export const listPeoleForActivities = async (personId: number) => {
  return await Activities.findAll({
    where: { personId },
  });
};
