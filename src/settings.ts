import * as dotenv from 'dotenv';

dotenv.config()
dotenv.config({ path: '/var/secrets-store/.env.generic', override: true });
dotenv.config({ path: '/var/secrets-store/.env', override: true });

export const PORT = process.env.PORT;

export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = Number(process.env.DB_PORT);
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;

export const ENVIRONMENT = process.env.ENVIRONMENT || 'development';