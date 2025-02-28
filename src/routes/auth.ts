import express from 'express';
import AuthController from '../controllers/AuthController.ts';
import { validateLogin, validateRegister } from '../middlewares/AuthMiddleware.ts';
import AuthPrismaController from '../controllers/AuthPrismaController.ts';

const route = express.Router();

route.post('/register', validateRegister, AuthPrismaController.register);
route.post('/login', validateLogin, AuthController.login);

export default route;