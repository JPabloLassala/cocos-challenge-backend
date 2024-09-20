import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMarketdataTable1726359648907 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE marketdata (
        id SERIAL PRIMARY KEY,
        instrumentId INT,
        high NUMERIC(10, 2),
        low NUMERIC(10, 2),
        open NUMERIC(10, 2),
        close NUMERIC(10, 2),
        previousClose NUMERIC(10, 2),
        date DATE,
        FOREIGN KEY (instrumentId) REFERENCES instruments(id)
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE marketdata');
  }
}
