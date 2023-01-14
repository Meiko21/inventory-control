import { connection as database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';
import { date } from 'yup';

interface IInventoryItem {
  id: string,
  name: string,
  quantity: number,
  created_at?: Date,
  updated_at?: Date
}

class InventoryRepository {
  async create(name: string) {
    const [inventory] = await database.table('inventory')
      .insert({
        id: uuidv4(),
        name,
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
        'quantity',
        'created_at',
        'updated_at'
      ])
      .first();

    return item;
  }
}

export default new InventoryRepository();