import { Application, Request, Response } from 'express';

import { ensureDatabaseConnection } from '../../database/connection';

import employeeRoutes from './employeeRoutes';
import inventoryRoutes from './inventoryRoutes';
import transactionRoutes from './transactionRoutes';

export default (app: Application) => {

  app.get('/', async (req: Request, res: Response) => {
    const dbConnection = await ensureDatabaseConnection();

    const response = {
      status: 'Running: ' + new Date(),
      database_status: dbConnection
    }

    return res.send(response).status(200);
  });

  app.use('/employee', employeeRoutes);
  app.use('/inventory', inventoryRoutes);
  app.use('/transaction', transactionRoutes);
};
