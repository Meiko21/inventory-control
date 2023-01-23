import { connection as database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

class TransactionRepository {
  async create(params: { employee_id: string, inventory_id: string, type: ["Entry" | "Exit"], price: number, quantity: number }) {
    const [employee] = await database('transaction')
      .insert({
        id: uuidv4(),
        employee_id: params.employee_id,
        inventory_id: params.inventory_id,
        type: params.type,
        price: params.price,
        quantity: params.quantity
      })
      .returning("id");

    return employee.id;
  }
}

export default new TransactionRepository();