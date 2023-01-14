import { connection as database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

interface IEmployee {
  id: string,
  internal_code: string,
  name: string,
  created_at?: Date,
  updated_at?: Date
}

class EmployeeRepository {
  async create(params: { internal_code: string, name: string }) {
    const [employee] = await database('employee')
      .insert({
        id: uuidv4(),
        internal_code: params.internal_code,
        name: params.name,
        is_system_user: false
      })
      .returning("id");

    return employee.id;
  }

  async list() {
    return database.table('employee')
      .select([
        'id',
        'internal_code',
        'name',
        'created_at',
        'updated_at'
      ]);
  }

  async findByInternalCode(code: string): Promise<IEmployee | undefined> {
    const employee = await database<IEmployee>('employee')
      .where("internal_code", code)
      .select([
        'id',
        'internal_code',
        'name',
        'created_at',
        'updated_at'
      ])
      .first();

    return employee;
  }
}

export default new EmployeeRepository();