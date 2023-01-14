import { Router } from 'express';

import InventoryController from '../controllers/InventoryController';

const router = Router();

router.post("/create", InventoryController.createItem);
router.get('/list', InventoryController.list);

export default router;