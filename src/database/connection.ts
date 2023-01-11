import knex from 'knex';

import { ENVIRONMENT } from '../settings';
import config from './knexfile';

export const connection = knex(config[ENVIRONMENT]);

export const ensureDatabaseConnection = async () => connection.raw('select 1')
  .then(() => {
    console.log('Database Connected');

    return 'Database Connected';
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });