import { connection as database } from '../database/connection';
import { v4 as uuidv4 } from 'uuid';

interface IEmployee {
  id: string,
  internal_code: string,
  name: string,
  email?: string,
  password?: string,
  created_at?: Date,
  updated_at?: Date
}

class EmployeeRepository {
  async create(params: { internal_code: string, name: string, email?: string, password?: string, is_system_user?: boolean }) {
    const [employee] = await database('employee')
      .insert({
        id: uuidv4(),
        internal_code: params.internal_code,
        name: params.name,
        email: params?.email,
        password: params?.password,
        is_system_user: params?.is_system_user
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

  async findById(id: string): Promise<IEmployee | undefined> {
    const employee = await database<IEmployee>('employee')
      .where("id", id)
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

  async findByEmail(email: string): Promise<IEmployee | undefined> {
    const employee = await database<IEmployee>('employee')
      .where("email", email)
      .select([
        'id',
        'internal_code',
        'name',
        'email',
        'password',
        'created_at',
        'updated_at'
      ])
      .first();

    return employee;
  }
}

export default new EmployeeRepository();