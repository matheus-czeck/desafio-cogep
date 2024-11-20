import { Activities } from '../../models';
import { People } from '../../models/people';

export const createPeople = async (data: any) => {
  return await People.create(data);
};

export const peopleList = async () => {
  return await People.findAll();
};

export const getPersonById = async (id: string) => {
    const people = await People.findByPk(id, {
        include: [
          {
            model: Activities,
            as: 'atividades', 
          },
        ],
      });
  
      if (!people) {
        throw({ error: 'Pessoa não encontrada' });
      }
      return people
};
