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
exports.loginUser = exports.registerUser = void 0;
const user_1 = require("../../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET_KEY = process.env.JWT_SECRET || 'default-secret';
const registerUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar se o email já está em uso
    const existingUser = yield user_1.User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('E-mail já cadastrado');
    }
    // Hash da senha
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    // Criar usuário com email e senha
    return yield user_1.User.create({ email, password: hashedPassword });
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Tentando login para o email: ${email}`);
    const user = yield user_1.User.findOne({ where: { email } });
    if (!user) {
        console.log(`Usuário não encontrado no banco de dados: ${email}`);
        throw new Error('Usuário não encontrado');
    }
    console.log(`Usuário encontrado: ${user.email}`);
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    console.log(`Senha válida: ${isPasswordValid}`);
    if (!isPasswordValid) {
        throw new Error('Senha incorreta');
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    console.log(`Token gerado: ${token}`);
    return { token, user };
});
exports.loginUser = loginUser;
