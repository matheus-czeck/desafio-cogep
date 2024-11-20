import { Router } from 'express';
import { loginController, registerController } from '../../services/controllers/auth.controller';

const router = Router();

// Rota de registro de usuário
router.post('/register', registerController);

// Rota de login
router.post('/login', loginController);

export default router;
