import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Pessoa } from './pessoas'; /

export class Atividade extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public personId!: number; 
}

Atividade.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Atividade',
  }
);


Atividade.belongsTo(Pessoa, { foreignKey: 'personId' });
