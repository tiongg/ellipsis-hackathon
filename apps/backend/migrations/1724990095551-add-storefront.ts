import { MigrationInterface, QueryRunner } from "typeorm";

export class AddStorefront1724990095551 implements MigrationInterface {
    name = 'AddStorefront1724990095551'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."store_membership_role_enum" AS ENUM('Owner', 'Admin', 'Member')`);
        await queryRunner.query(`CREATE TABLE "store_membership" ("member_id" uuid NOT NULL, "store_id" uuid NOT NULL, "role" "public"."store_membership_role_enum" NOT NULL, CONSTRAINT "PK_f1bae7423d8244456d081acce72" PRIMARY KEY ("member_id", "store_id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("store_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_name" character varying NOT NULL, "description" character varying NOT NULL, "store_url" character varying NOT NULL, "receiving_bank_account" character varying NOT NULL, "longitude" double precision NOT NULL, "latitude" double precision NOT NULL, "postal_code" character varying NOT NULL, CONSTRAINT "PK_94d7b0f600366ceb5c960069687" PRIMARY KEY ("store_id"))`);
        await queryRunner.query(`ALTER TABLE "store_membership" ADD CONSTRAINT "FK_1d32a5f19250b2f4bfcd525c376" FOREIGN KEY ("member_id") REFERENCES "member"("member_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "store_membership" ADD CONSTRAINT "FK_8cb0a5602180716d701016bad94" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store_membership" DROP CONSTRAINT "FK_8cb0a5602180716d701016bad94"`);
        await queryRunner.query(`ALTER TABLE "store_membership" DROP CONSTRAINT "FK_1d32a5f19250b2f4bfcd525c376"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "store_membership"`);
        await queryRunner.query(`DROP TYPE "public"."store_membership_role_enum"`);
    }

}
