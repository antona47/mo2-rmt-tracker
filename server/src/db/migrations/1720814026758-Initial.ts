import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1720814026758 implements MigrationInterface {
    name = 'Initial1720814026758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales" ("id" SERIAL NOT NULL, "provider" integer NOT NULL, "buyer" character varying(30) NOT NULL, "amount" integer NOT NULL, "comment" character varying(100) NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "datePrice" integer NOT NULL, "value" integer NOT NULL, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_dc4a98616487ba4300c0bb9f8a" ON "sales" ("provider") `);
        await queryRunner.query(`CREATE INDEX "IDX_e31efaf4d7f03acaf3f3716a7d" ON "sales" ("buyer") `);
        await queryRunner.query(`CREATE INDEX "IDX_4870a471bb360576d04d481402" ON "sales" ("date") `);
        await queryRunner.query(`CREATE TABLE "quotes" ("id" SERIAL NOT NULL, "provider" integer NOT NULL, "price" integer NOT NULL, "offers" integer NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "UQ_052d3fbdabe687106ea7d0ba9fc" UNIQUE ("provider", "date"), CONSTRAINT "PK_99a0e8bcbcd8719d3a41f23c263" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_63e0dce3d114272768d05754e4" ON "quotes" ("provider") `);
        await queryRunner.query(`CREATE INDEX "IDX_5576bb64e37d0c192294627687" ON "quotes" ("date") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_5576bb64e37d0c192294627687"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63e0dce3d114272768d05754e4"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4870a471bb360576d04d481402"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e31efaf4d7f03acaf3f3716a7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc4a98616487ba4300c0bb9f8a"`);
        await queryRunner.query(`DROP TABLE "sales"`);
    }

}
