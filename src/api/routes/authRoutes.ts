import { Router } from 'express';

import AuthController from '../controllers/AuthController';

import { authRequestValidator } from './validators/authRequestValidator';

const router = Router();

router.post("/", authRequestValidator, AuthController.authenticate);

export default router;