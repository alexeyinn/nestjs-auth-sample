import { MigrationInterface, QueryRunner } from "typeorm";

export class UserRoleBase1664971047511 implements MigrationInterface {
    name = 'UserRoleBase1664971047511'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "patronymic" character varying NOT NULL, "department" character varying NOT NULL, "position" character varying NOT NULL, "phone" character varying NOT NULL, "photo" character varying, "notification" boolean NOT NULL DEFAULT false, "hash" character varying NOT NULL, "hashedRt" character varying, "roleId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_98082dbb08817c9801e32dd0155" UNIQUE ("value"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "base" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "expiryDate" TIMESTAMP NOT NULL, "amount" integer NOT NULL, "reagentUnit" character varying NOT NULL, "reagentPurity" character varying NOT NULL, "standard" character varying NOT NULL, "batchNumber" character varying NOT NULL, "dateOfManufacture" TIMESTAMP NOT NULL, "arrivalDate" TIMESTAMP NOT NULL, "invoice" character varying NOT NULL, "manufacturer" character varying NOT NULL, "provider" character varying NOT NULL, "comment" character varying, "warningPeriod" character varying NOT NULL, CONSTRAINT "PK_ee39d2f844e458c187af0e5383f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`DROP TABLE "base"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
