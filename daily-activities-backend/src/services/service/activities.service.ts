import { Activities } from '../../models/activities';


export const createActivities = async (data: any) => {
  return await Activities.create(data);
};

export const listPeoleForActivities = async (personId: number) => {
  return await Activities.findAll({
    where: { personId },
  });
};
