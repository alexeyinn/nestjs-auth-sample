import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1652338894565 implements MigrationInterface {
  name = 'SeedDb1652338894565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO role (value) VALUES ('reader'), ('writer')`
    );

    await queryRunner.query(
      `INSERT INTO "user" (email, "roleId", "lastName", "firstName",
"patronymic", department, phone, position, hash) VALUES ('firstreader@mail.com',
1, 'Иванов', 'Иван', 'Иванович', 'Лаборатория', '+78007775500', 'Химик',
'$2b$05$Rjt.q6Ap3C8UqsUgZOAhmewQC8KUWiJcfLWP8fNOiJzU4NdcxJsFG')`
    );

    await queryRunner.query(
      `INSERT INTO "base" (name, "expiryDate", amount, "reagentUnit", "reagentPurity",
standard, "batchNumber", "dateOfManufacture", "arrivalDate", invoice, manufacturer,
provider, comment, "warningPeriod") VALUES ('Соляная кислота', '22.06.2023', 5,
'мл', 'х.ч.', 'ГОСТ 857-95', 256789, '22.06.2022', '22.07.2022', '25-3456', 'Химпром',
'ООО Ромашка', 'Это соляная кислота', '1 месяц')`
    );
  }

  public async down(): Promise<void> {}
}
