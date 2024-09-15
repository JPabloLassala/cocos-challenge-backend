import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInstrumentsTable1726359505473 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE instruments (
        id SERIAL PRIMARY KEY,
        ticker VARCHAR(10),
        name VARCHAR(255),
        type VARCHAR(10)
      );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE instruments');
  }
}
