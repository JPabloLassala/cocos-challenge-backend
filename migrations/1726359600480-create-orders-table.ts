import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrdersTable1726359600480 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      instrumentId INT,
      userId INT,
      size INT,
      price NUMERIC(10, 2),
      type VARCHAR(10),
      side VARCHAR(10),
      status VARCHAR(20),
      datetime TIMESTAMP,
      FOREIGN KEY (instrumentId) REFERENCES instruments(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE orders');
  }
}
