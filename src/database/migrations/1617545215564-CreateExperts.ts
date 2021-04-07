import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExperts1617545215564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'experts',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'name', type: 'varchar', isNullable: false },
        {
          name: 'email', type: 'varchar', isNullable: false, isUnique: true,
        },
        { name: 'password', type: 'varchar', isNullable: false },
        { name: 'stars', type: 'double(4,2)', default: 0 },
        { name: 'location', type: 'varchar', isNullable: false },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('experts');
  }
}
