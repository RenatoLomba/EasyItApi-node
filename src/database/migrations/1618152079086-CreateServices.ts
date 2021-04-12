import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateServices1618152079086 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'services',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'expert_id', type: 'varchar', isNullable: false },
        { name: 'name', type: 'varchar', isNullable: false },
        { name: 'code', type: 'varchar', isNullable: true },
        { name: 'description', type: 'varchar', isNullable: true },
        { name: 'price', type: 'double(10,2)', isNullable: false },
      ],
      foreignKeys: [
        {
          name: 'FK_SERVICES_EXPERT',
          referencedTableName: 'experts',
          referencedColumnNames: ['id'],
          columnNames: ['expert_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('services');
  }
}
