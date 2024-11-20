import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Atividade } from './atividades'; 

export class Pessoa extends Model {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string;
  public address!: string;
}

Pessoa.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Pessoa',
  }
);

// Relacionamento
Pessoa.hasMany(Atividade, { foreignKey: 'personId' });
