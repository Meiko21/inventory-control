import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import EmployeeRepository from '../../repositories/EmployeeRepository';

class EmployeeController {
  async create(req: Request, res: Response): Response {
    const { internal_code, name } = req.body;
    const email = req.body?.email;
    const password = req.body?.password;

    const internalCodeRegistered = await EmployeeRepository.findByInternalCode(internal_code);

    if (internalCodeRegistered) {
      return res.json({
        message: `Employee already registered with internal code ${internal_code}`,
      }).status(400);
    }

    if (email) {
      const emailRegistered = await EmployeeRepository.findByEmail(email);

      if (emailRegistered) {
        return res.json({
          message: `Employee already registered with email ${email}`,
        }).status(400);
      }
    }

    let is_system_user = false;
    let encryptedPassword = null;

    if (email && password) {
      is_system_user = true;
      encryptedPassword = bcrypt.hashSync(password, 10);
    }

    const id = await EmployeeRepository.create({
      name,
      internal_code,
      is_system_user,
      email,
      password: encryptedPassword
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