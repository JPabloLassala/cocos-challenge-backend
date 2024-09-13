import { registerAs } from '@nestjs/config';

export interface IAppConfig {
  port: number;
  environment: string;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  database: {},
}));

export const databaseconfig = registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'root',
}));
