"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getPeopleById = exports.listarPessoas = exports.peopleCreate = void 0;
const servicePeople = __importStar(require("../service/people.service"));
const people_1 = require("../../models/people");
const activities_1 = require("../../models/activities");
const peopleCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield servicePeople.createPeople(req.body);
        res.status(201).json(people);
    }
    catch (error) {
        console.error('Erro ao criar pessoa:', error);
        res.status(500).json({ error: 'Erro ao criar pessoa.' });
    }
});
exports.peopleCreate = peopleCreate;
const listarPessoas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const people = yield servicePeople.peopleList();
        res.status(200).json(people);
    }
    catch (error) {
        console.error('Erro ao listar pessoas:', error);
        res.status(500).json({ error: 'Erro ao listar pessoas.' });
    }
});
exports.listarPessoas = listarPessoas;
const getPeopleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const people = yield people_1.People.findByPk(id, {
            include: [
                {
                    model: activities_1.Activities,
                    as: 'atividadesPessoa', // Deve ser igual ao alias configurado no relacionamento
                },
            ],
        });
        if (!people) {
            return res.status(404).json({ error: 'Pessoa não encontrada' });
        }
        res.json(people);
    }
    catch (err) {
        console.error('Erro ao obter detalhes da pessoa:', err);
        res.status(500).json({ error: 'Erro ao obter detalhes da pessoa.' });
    }
});
exports.getPeopleById = getPeopleById;
