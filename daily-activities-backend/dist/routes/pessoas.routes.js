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
const auth_middleware_1 = require("../middlewares/auth.middleware");
const pessoas_1 = require("../models/pessoas");
const atividades_1 = require("../models/atividades"); // Certifique-se de que está importado corretamente
const router = (0, express_1.Router)();
// Middleware de autenticação
router.use(auth_middleware_1.authenticate);
// Obter todas as pessoas
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pessoas = yield pessoas_1.Pessoa.findAll(); // Busca todas as pessoas cadastradas
        console.log('Lista de pessoas retornada:', pessoas);
        res.json(pessoas); // Retorna a lista
    }
    catch (err) {
        console.error('Erro ao obter pessoas:', err);
        res.status(500).json({ error: 'Erro ao obter pessoas.' });
    }
}));
// Obter detalhes de uma pessoa pelo ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        console.log(`Buscando detalhes da pessoa com ID: ${id}`); // Log do ID recebido
        const pessoa = yield pessoas_1.Pessoa.findByPk(id, {
            include: [
                {
                    model: atividades_1.Atividade,
                    as: 'atividades', // Certifique-se de que o alias está correto no modelo
                },
            ],
        });
        if (!pessoa) {
            console.log('Pessoa não encontrada'); // Log para verificar se não encontrou
            return res.status(404).json({ error: 'Pessoa não encontrada' });
        }
        console.log('Pessoa encontrada:', pessoa); // Log dos dados retornados
        res.json(pessoa);
    }
    catch (err) {
        console.error('Erro ao buscar detalhes da pessoa:', err); // Log detalhado do erro
        res.status(500).json({ error: 'Erro ao buscar detalhes da pessoa.' });
    }
}));
// Criar uma nova pessoa
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, email, address } = req.body;
    try {
        console.log('Dados recebidos no backend:', req.body);
        const novaPessoa = yield pessoas_1.Pessoa.create({ name, phone, email, address: JSON.stringify(address) });
        res.status(201).json(novaPessoa);
    }
    catch (err) {
        res.status(400).json({ error: 'Erro ao criar pessoa' });
    }
}));
exports.default = router;
