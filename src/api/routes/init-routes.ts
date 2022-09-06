import {Router} from 'express';
import container from '../../inversify.config';
import TYPES from '../../util/TYPES';
import InitController from '../controllers/implementations/InitController';

const router = Router();

const initController = container.get<InitController>(TYPES.InitController);

// Initial Page Routes
router.get('/', initController.indexPage) // Index page

export default router;