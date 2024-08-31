import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductCategory1725064274219 implements MigrationInterface {
  name = 'AddProductCategory1725064274219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    //Default so existing products don't break
    await queryRunner.query(
      `ALTER TABLE "product" ADD "product_category" character varying NOT NULL DEFAULT 'uncategorized'`
    );
    //Drop default so we can change it
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "product_category" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "product_category"`
    );
  }
}
