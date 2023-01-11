import express, { RequestHandler } from 'express';
import cors from 'cors';
import routes from './api/routes';
import { PORT } from './settings';
import { ensureDatabaseConnection } from './database/connection';
import errorHandler from './api/middlewares/ErrorHandler';

const app = express();

app.use(express.json() as RequestHandler);

app.use(cors());

app.disable('x-powered-by');

app.listen(PORT, () => {
  console.log(`Inventory Control API started - listening on port: ${PORT}`);
})

routes(app);

ensureDatabaseConnection();

app.use(errorHandler);

export default app;