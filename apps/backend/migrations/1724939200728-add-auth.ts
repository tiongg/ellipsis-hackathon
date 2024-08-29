import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAuth1724939200728 implements MigrationInterface {
  name = 'AddAuth1724939200728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account" ("account_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "google_id" character varying, "sgid" character varying, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "deleted_date" TIMESTAMP, CONSTRAINT "PK_ea08b54a9d7322975ffc57fc612" PRIMARY KEY ("account_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "member" ("member_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "account_id" uuid NOT NULL, CONSTRAINT "REL_a706d6db681a07b5f485eff318" UNIQUE ("account_id"), CONSTRAINT "PK_73e1828d94de0b2ddf89da05463" PRIMARY KEY ("member_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "member" ADD CONSTRAINT "FK_a706d6db681a07b5f485eff318d" FOREIGN KEY ("account_id") REFERENCES "account"("account_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "member" DROP CONSTRAINT "FK_a706d6db681a07b5f485eff318d"`
    );
    await queryRunner.query(`DROP TABLE "member"`);
    await queryRunner.query(`DROP TABLE "account"`);
  }
}
