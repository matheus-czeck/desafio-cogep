import { Router } from 'express';
import * as activitiesController from '../../services/controllers/activities.controller';
import { authenticate } from '../../services/middlewares/auth.middleware';

const router = Router();

// Middleware de autenticação
router.use(authenticate);

// Rotas para atividades
router.post('/', activitiesController.activitiesCreate); // Criar atividade
router.get('/', activitiesController.activitiesList); // Listar todas atividades
router.get('/:personId', activitiesController.listPeoleForActivities); // Listar atividades por pessoa

export default router;
