"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Activities = exports.People = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const people_1 = require("./people");
Object.defineProperty(exports, "People", { enumerable: true, get: function () { return people_1.People; } });
const activities_1 = require("./activities");
Object.defineProperty(exports, "Activities", { enumerable: true, get: function () { return activities_1.Activities; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
people_1.People.hasMany(activities_1.Activities, { foreignKey: "personId", as: "atividadesPessoa" });
activities_1.Activities.belongsTo(people_1.People, { foreignKey: "personId", as: "pessoaAtividade" });
