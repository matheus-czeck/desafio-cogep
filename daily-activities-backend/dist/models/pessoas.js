"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pessoa = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const atividades_1 = require("./atividades");
class Pessoa extends sequelize_1.Model {
}
exports.Pessoa = Pessoa;
Pessoa.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Pessoa',
});
Pessoa.hasMany(atividades_1.Atividade, { as: 'atividades', foreignKey: 'pessoaId' });
atividades_1.Atividade.belongsTo(Pessoa, { foreignKey: 'pessoaId' });
