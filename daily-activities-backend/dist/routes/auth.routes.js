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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const router = (0, express_1.Router)();
// Rota para registrar um novo usuário
router.post('/register', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Verifica se o email já está registrado
        const existingUser = yield user_1.User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'E-mail já registrado' });
            return;
        }
        // Cria o hash da senha
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Salva o usuário no banco
        const newUser = yield user_1.User.create({ name, email, password: hashedPassword });
        res.status(201).json({ id: newUser.id, email: newUser.email, name: newUser.name });
    }
    catch (error) {
        next(error); // Encaminha o erro para o middleware de erro
    }
}));
const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';
// Rota para login
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Verifica se o usuário existe
        const user = yield user_1.User.findOne({ where: { email } });
        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }
        // Verifica a senha
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Senha incorreta' });
            return;
        }
        // Gera o token JWT
        const token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        next(error); // Encaminha o erro para o middleware de erro
    }
}));
exports.default = router;
