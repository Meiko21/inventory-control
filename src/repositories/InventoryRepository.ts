import { connection as database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

interface IInventoryItem {
  id: string,
  name: string,
  quantity: number,
  price: number,
  created_at?: Date,
  updated_at?: Date
}

class InventoryRepository {
  async create(params: { name: string, price: number }) {
    const [inventory] = await database.table('inventory')
      .insert({
        id: uuidv4(),
        name: params.name,
        price: params.price,
        quantity: 0
      })
      .returning("id");

    return inventory.id;
  }

  async list() {
    return database.table('inventory')
      .select([
        'id',
        'name',
        'quantity',
        'created_at',
        'updated_at'
      ]);
  }

  async findItemByName(name: string): Promise<IInventoryItem | undefined> {
    const item: IInventoryItem = await database<IInventoryItem>('inventory')
      .where("name", name)
      .select([
        'id',
        'name',
        'price',
        'quantity',
        'created_at',
        'updated_at'
      ])
      .first();

    return item;
  }

  async findItemById(id: string): Promise<IInventoryItem | undefined> {
    const item: IInventoryItem = await database<IInventoryItem>('inventory')
      .where("id", id)
      .select([
        'id',
        'name',
        'quantity',
        'price',
        'created_at',
        'updated_at'
      ])
      .first();

    return item;
  }

  async updateItemQuantity(id: string, quantity: number) {
    return database('inventory')
      .where("id", id)
      .update("quantity", quantity);
  }
}

export default new InventoryRepository();