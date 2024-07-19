import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersAndSessions1721111193363 implements MigrationInterface {
    name = 'UsersAndSessions1721111193363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "discord_id" character varying(20) NOT NULL, "discord_username" character varying(30) NOT NULL, "discord_access_token" character varying(30) NOT NULL, "name" character varying(20) NOT NULL, "hasAccess" boolean NOT NULL, "isAdmin" boolean NOT NULL, "first_login" bigint NOT NULL, "last_login" bigint NOT NULL, CONSTRAINT "UQ_ecb6461da358b6d8a4f83d611a0" UNIQUE ("discord_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "user_id" integer NOT NULL, "session_token" character varying(64) NOT NULL, "csrf_token" character varying(64) NOT NULL, "valid_until" bigint NOT NULL, CONSTRAINT "UQ_085d540d9f418cfbdc7bd55bb19" UNIQUE ("user_id"), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sessions"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
