import sequelize from "../config/database";
import { People } from "./people";
import { Activities } from "./activities";
import { User } from "./user";

People.hasMany(Activities, { foreignKey: "personId", as: "atividadesPessoa" });
Activities.belongsTo(People, { foreignKey: "personId", as: "pessoaAtividade" });


export { sequelize, People, Activities, User };
