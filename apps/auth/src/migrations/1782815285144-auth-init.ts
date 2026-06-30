import { MigrationInterface, QueryRunner } from "typeorm";

export class AuthInit1782815285144 implements MigrationInterface {
    name = 'AuthInit1782815285144'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "token" character varying(255) NOT NULL, "type" character varying(255) NOT NULL, "expiresAt" character varying(255) NOT NULL, "account_id" uuid NOT NULL, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_530d9d8c09bf03091de293ee3f" ON "tokens"  ("account_id") `);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" text, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" character varying(255) NOT NULL, "description" text, "isActive" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isVerified" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permissions" ("permission_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY ("permission_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON "roles_permissions"  ("permission_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON "roles_permissions"  ("role_id") `);
        await queryRunner.query(`CREATE TABLE "accounts_roles" ("account_id" uuid NOT NULL, "role_id" uuid NOT NULL, CONSTRAINT "PK_48e4d44b025f6c4c24e00976ffa" PRIMARY KEY ("account_id", "role_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7cfaeb15d546d9df6d9478bcf0" ON "accounts_roles"  ("account_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_14d5f95b4081e265c45668b433" ON "accounts_roles"  ("role_id") `);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_530d9d8c09bf03091de293ee3fe" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts_roles" ADD CONSTRAINT "FK_7cfaeb15d546d9df6d9478bcf00" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accounts_roles" ADD CONSTRAINT "FK_14d5f95b4081e265c45668b433d" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts_roles" DROP CONSTRAINT "FK_14d5f95b4081e265c45668b433d"`);
        await queryRunner.query(`ALTER TABLE "accounts_roles" DROP CONSTRAINT "FK_7cfaeb15d546d9df6d9478bcf00"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719"`);
        await queryRunner.query(`ALTER TABLE "roles_permissions" DROP CONSTRAINT "FK_337aa8dba227a1fe6b73998307b"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_530d9d8c09bf03091de293ee3fe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14d5f95b4081e265c45668b433"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7cfaeb15d546d9df6d9478bcf0"`);
        await queryRunner.query(`DROP TABLE "accounts_roles"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7d2dad9f14eddeb09c256fea71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_337aa8dba227a1fe6b73998307"`);
        await queryRunner.query(`DROP TABLE "roles_permissions"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "permissions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_530d9d8c09bf03091de293ee3f"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
    }

}
