import { Router } from 'express';
import { activitiesCreate,listPeoleForActivities } from '../../services/controllers/activities.controller';
import { authenticate } from '../../services/middlewares/auth.middleware';

const router = Router();


router.use(authenticate);

router.post('/', activitiesCreate); 

router.get('/:personId', listPeoleForActivities); 

export default router;
