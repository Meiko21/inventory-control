import { Router } from 'express';

import TransactionController from '../controllers/TransactionController';
import { validateCreateTransactionRequest } from './validators/createTransactionValidator';

const router = Router();

router.post("/", validateCreateTransactionRequest, TransactionController.create);
// router.get('/list', InventoryController.list);

export default router;