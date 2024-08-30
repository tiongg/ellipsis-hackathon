import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPayments1725018922698 implements MigrationInterface {
  name = 'AddPayments1725018922698';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment" ("payment_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "member_id" character varying NOT NULL, "stripe_payment_id" character varying, "amount_subtotal" integer, "amount_total" integer, "created_time" integer, "currency" character varying, "customer_name" character varying, "customer_email" character varying, "payment_status" character varying NOT NULL DEFAULT 'pending', "status_details" character varying, CONSTRAINT "PK_9fff60ac6ac1844ea4e0cfba67a" PRIMARY KEY ("payment_id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("order_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "listing_id" uuid NOT NULL, "ordered_by" uuid NOT NULL, "payment_id" uuid NOT NULL, CONSTRAINT "REL_81756fa82ce1df11e48f485801" UNIQUE ("listing_id"), CONSTRAINT "PK_58998c5eaeaacdd004dec8b5d86" PRIMARY KEY ("order_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_81756fa82ce1df11e48f485801b" FOREIGN KEY ("listing_id") REFERENCES "listing"("listing_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_0642fb6d8e26c2f2eeda27cd8b9" FOREIGN KEY ("ordered_by") REFERENCES "member"("member_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_28c756d4fd41223fedfbd2750e1" FOREIGN KEY ("payment_id") REFERENCES "payment"("payment_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_28c756d4fd41223fedfbd2750e1"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_0642fb6d8e26c2f2eeda27cd8b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_81756fa82ce1df11e48f485801b"`
    );
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "payment"`);
  }
}
