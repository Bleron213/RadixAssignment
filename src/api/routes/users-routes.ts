import {Router} from 'express';
import container from '../../inversify.config';
import TYPES from '../../util/TYPES';
import UserController from '../controllers/implementations/UserController';

const router = Router();

const userController = container.get<UserController>(TYPES.UserController);

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser)
router.delete('/delete/:id', userController.deleteUser);
router.post('/create', userController.createUser);
router.put('/update/:id', userController.updateUser);


export default router;