import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Activities extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public startDate!: Date;
  public endDate!: Date;
  public personId!: number;
}

Activities.init(
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
    modelName: 'Activities',
  }
);




