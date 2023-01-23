import { Router } from 'express';

import EmployeeController from '../controllers/EmployeeController';

import { validateCreateEmployeeRequest } from './validators/createEmployeeValidator';

const router = Router();

router.post("/create", validateCreateEmployeeRequest, EmployeeController.create);
router.get('/list', EmployeeController.list);

export default router;