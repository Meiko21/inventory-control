import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { SECRET_AUTHENTICATION_HASH } from '../../settings';
import EmployeeRepository from '../../repositories/EmployeeRepository';
import bcrypt from 'bcrypt';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await EmployeeRepository.findByEmail(email);

    if (!user) {
      return res.json({
        message: `Incorrect email or password`,
      }).status(400);
    }

    const isUserCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isUserCorrectPassword) {
      return res.json({
        message: `Incorrect email or password`,
      }).status(400);
    }

    const jwtToken = jwt.sign(
      {
        id: user.id,
        internal_code: user.internal_code,
        name: user.name,
        email: user.email
      },
      SECRET_AUTHENTICATION_HASH,
      { expiresIn: '5h' }
    );

    res.json({ token: jwtToken });
  }
}

export default new AuthController();