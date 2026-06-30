import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersInit1782816819761 implements MigrationInterface {
    name = 'UsersInit1782816819761'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "account_id" uuid NOT NULL, "fname" character varying(100) NOT NULL, "lname" character varying(100), "dob" date, "gender" character varying(50), "country" character varying(100), "addressLine1" character varying(255), "addressLine2" character varying(255), "phoneNumber" character varying(25), "postal" character varying(25), "city" character varying(100), "displayName" character varying(100), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_17a709b8b6146c491e6615c29d" ON "users"  ("account_id") `);
        await queryRunner.query(`CREATE TABLE "account_reads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "account_id" uuid NOT NULL, "email" character varying(100) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, "roles" character varying array NOT NULL DEFAULT '{}', CONSTRAINT "UQ_33a8efd25a06f2b2daedf930183" UNIQUE ("account_id"), CONSTRAINT "UQ_448ee60405d6ced77f463efa4b8" UNIQUE ("email"), CONSTRAINT "PK_559b732d51d546e2fb9146b99a6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "account_reads"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17a709b8b6146c491e6615c29d"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
