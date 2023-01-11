import { Knex } from 'knex';

import { DB_HOST, DB_PASSWORD, DB_USERNAME, DB_DATABASE } from '../settings';

const main: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USERNAME,
    password: DB_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

const config: { [key: string]: Knex.Config } = {
  development: main,
  production: main,
  staging: main
};

export default config;