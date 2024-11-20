"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../services/controllers/auth.controller");
const router = (0, express_1.Router)();
// Rota de registro de usuário
router.post('/register', auth_controller_1.registerController);
// Rota de login
router.post('/login', auth_controller_1.loginController);
exports.default = router;
