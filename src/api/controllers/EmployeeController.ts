import { Request, Response } from 'express';

import EmployeeRepository from '../../repositories/EmployeeRepository';

class EmployeeController {
  async create(req: Request, res: Response): Response {
    const { internal_code, name } = req.body;

    const employeeAlreadyExists = await EmployeeRepository.findByInternalCode(internal_code);

    if (employeeAlreadyExists) {
      return res.json({
        message: "Employee already registered.",
        employee: {
          id: employeeAlreadyExists.id,
          quantity: employeeAlreadyExists.internal_code,
          name: employeeAlreadyExists.name,
          registered_at: employeeAlreadyExists.created_at
        }
      }).status(400);
    }

    const id = await EmployeeRepository.create({
      name,
      internal_code
    });

    return res.json({
      id
    });
  }

  async list(req: Request, res: Response): Response {
    const employees = await EmployeeRepository.list();

    return res.json({
      employees
    })
  }
}

export default new EmployeeController();