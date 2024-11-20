import sequelize from '../config/database';
import { Sequelize } from 'sequelize';

const db: { [key: string]: any } = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
