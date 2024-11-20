"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peopleGetForId = exports.peopleList = exports.createPeople = void 0;
const people_1 = require("../../models/people");
const createPeople = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield people_1.People.create(data);
});
exports.createPeople = createPeople;
const peopleList = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield people_1.People.findAll();
});
exports.peopleList = peopleList;
const peopleGetForId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield people_1.People.findByPk(id, {
        include: ['atividades'],
    });
});
exports.peopleGetForId = peopleGetForId;
