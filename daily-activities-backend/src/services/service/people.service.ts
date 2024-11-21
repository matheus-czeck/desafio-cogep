import { Activities } from "../../models";
import { People } from "../../models/people";

const createPeople = async (data: any) => {
  const { name, phone, email, address } = data
  const person = await People.create({
    name,
    phone,
    email,
    address: JSON.stringify(address),
  });

  return person;
};

    const peopleList = async () => {
    const people = await People.findAll()
  return people;
};

    const getPersonById = async (id: string) => {
  const people = await People.findByPk(id, {
    include: [
      {
        model: Activities,
        as: "atividades",
      },
    ],
  });

  if (!people) {
    throw { error: "Pessoa não encontrada" };
  }
  return people;
};


const peopleService = {getPersonById, peopleList, createPeople}

export default peopleService;