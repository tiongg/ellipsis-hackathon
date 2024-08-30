import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableCreatedAt1725002932116 implements MigrationInterface {
  name = 'NullableCreatedAt1725002932116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "sold_at"`);
    await queryRunner.query(`ALTER TABLE "listing" ADD "sold_at" TIME`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "listing" DROP COLUMN "sold_at"`);
    await queryRunner.query(
      `ALTER TABLE "listing" ADD "sold_at" TIMESTAMP NOT NULL`
    );
  }
}
