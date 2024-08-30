import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProducts1724994899967 implements MigrationInterface {
    name = 'AddProducts1724994899967'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "store_id" uuid NOT NULL, "product_name" character varying NOT NULL, "product_description" character varying NOT NULL, "product_image_url" character varying NOT NULL, "product_price" numeric NOT NULL, "product_weight" numeric NOT NULL, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`CREATE TABLE "listing" ("listing_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sold_at" TIMESTAMP NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_bcf2831632b1055092370bb2f22" PRIMARY KEY ("listing_id"))`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815" FOREIGN KEY ("store_id") REFERENCES "store"("store_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "listing" ADD CONSTRAINT "FK_de137c05596c3ca3cf9fbc29901" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "listing" DROP CONSTRAINT "FK_de137c05596c3ca3cf9fbc29901"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4fb20f5e0d195dcc2e27e8cc815"`);
        await queryRunner.query(`DROP TABLE "listing"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
