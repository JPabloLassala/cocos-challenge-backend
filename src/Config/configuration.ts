import { registerAs } from "@nestjs/config";
import { DEFAULT_HOST, Environments } from "./config.constants";

export interface IAppConfig {
  port: number;
  environment: string;
  useEnv: boolean;
}

export interface IDatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export const appConfig = registerAs("app", () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || Environments.Development,
  useEnv: process.env.USE_ENV === "true",
  database: {},
}));

export const databaseConfig = registerAs("database", () => ({
  host: process.env.DB_HOST || DEFAULT_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  name: process.env.DB_NAME || "test",
}));
