import { Request, Response } from 'express';

import InventoryRepository from '../../repositories/InventoryRepository';

class InventoryController {
  async createItem(req: Request, res: Response): Response {
    const name = req.body.name;
    const price = req.body.price;

    const itemAlreadyExists = await InventoryRepository.findItemByName(name);

    if (itemAlreadyExists) {
      return res.json({
        message: "Item already registered.",
        item: {
          id: itemAlreadyExists.id,
          name: itemAlreadyExists.name,
          quantity: itemAlreadyExists.quantity
        }
      }).status(400);
    }

    const id = await InventoryRepository.create({
      name,
      price
    });

    return res.json({
      id
    });
  }

  async list(req: Request, res: Response): Response {
    const inventoryItems = await InventoryRepository.list();

    return res.json({
      inventoryItems
    })
  }
}

export default new InventoryController();