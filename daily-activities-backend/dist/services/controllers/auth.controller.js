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
exports.registerController = exports.loginController = void 0;
const auth_service_1 = require("../service/auth.service");
// Controlador de Login
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(`Tentando login para o email: ${email}`);
    try {
        // Chama a função do service para autenticar o usuário
        const { token, user } = yield (0, auth_service_1.loginUser)(email, password);
        console.log('Login bem-sucedido');
        res.status(200).json({ token, user });
    }
    catch (error) {
        console.error('Erro ao fazer login:', error instanceof Error ? error.message : error);
        res.status(401).json({
            message: error instanceof Error ? error.message : 'Erro ao autenticar usuário.',
        });
    }
});
exports.loginController = loginController;
// Controlador de Registro
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const newUser = yield (0, auth_service_1.registerUser)(email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Erro ao registrar usuário:', error instanceof Error ? error.message : error);
        res.status(400).json({ message: error instanceof Error ? error.message : 'Erro ao registrar usuário.' });
    }
});
exports.registerController = registerController;
