import { Router } from 'express';

import EmployeeController from '../controllers/EmployeeController';

const router = Router();

router.post("/create", EmployeeController.create);
router.get('/list', EmployeeController.list);

export default router;