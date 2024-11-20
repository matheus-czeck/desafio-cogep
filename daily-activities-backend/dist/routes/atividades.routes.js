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
const express_1 = require("express");
const atividades_1 = require("../models/atividades");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Middleware de autenticação
router.use(auth_middleware_1.authenticate);
// Obter todas as atividades
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const atividades = yield atividades_1.Atividade.findAll();
        res.json(atividades);
    }
    catch (err) {
        res.status(500).json({ error: 'Erro ao obter atividades.' });
    }
}));
// Criar uma nova atividade
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, startDate, endDate } = req.body;
        const novaAtividade = yield atividades_1.Atividade.create({ name, description, startDate, endDate });
        res.status(201).json(novaAtividade);
    }
    catch (err) {
        res.status(400).json({ error: 'Erro ao criar atividade.' });
    }
}));
exports.default = router;
