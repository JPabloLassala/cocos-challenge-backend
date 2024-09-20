import { DataSource } from "typeorm";
import { config } from "dotenv";
import { join } from "path";

if (process.env.IGNORE_ENV_FILE !== "true") {
  config();
}
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: parseInt(DB_PORT) || 5432,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [],
  migrations: [join(__dirname, "migrations", "*.js")],
  synchronize: false, // Set to false in production
  logging: true,
});

export default AppDataSource;
