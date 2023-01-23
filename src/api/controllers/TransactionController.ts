import { Request, Response } from 'express';

import EmployeeRepository from '../../repositories/EmployeeRepository';
import InventoryRepository from '../../repositories/InventoryRepository';
import TransactionRepository from '../../repositories/TransactionRepository';

class TransactionController {
  async create(req: Request, res: Response): Response {
    try {
      const { employee_id, inventory_id, type, quantity } = req.body;

      const employee = await EmployeeRepository.findById(employee_id);

      if (!employee) {
        throw new Error("Employee not found");
      }

      const inventoryItem = await InventoryRepository.findItemById(inventory_id);

      if (!inventoryItem) {
        throw new Error("Inventory item not found");
      }

      if (type == 'Exit' && inventoryItem.quantity < (quantity * -1)) {
        throw new Error("The quantity requested are not available in inventory")
      }

      const transactionPrice = quantity * inventoryItem.price;

      const newItemQuantity = inventoryItem.quantity + quantity;

      const id = await TransactionRepository.create({
        employee_id,
        inventory_id,
        type,
        quantity,
        price: transactionPrice
      });

      await InventoryRepository.updateItemQuantity(inventory_id, newItemQuantity);

      return res.json({
        id
      });
    } catch (err) {
      return res.status(400).json({
        message: err.message
      });
    }
  }
}

export default new TransactionController();