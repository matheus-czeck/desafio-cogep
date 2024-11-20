import { People } from '../../models/people';

export const createPeople = async (data: any) => {
  return await People.create(data);
};

export const peopleList = async () => {
  return await People.findAll();
};

export const peopleGetForId = async (id: number) => {
  return await People.findByPk(id, {
    include: ['atividades'],
  });
};
