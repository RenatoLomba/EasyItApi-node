import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAppointment1618257802853 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'appointments',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'user_id', type: 'varchar', isNullable: false },
        { name: 'expert_id', type: 'varchar', isNullable: false },
        { name: 'service_id', type: 'varchar', isNullable: false },
        { name: 'date', type: 'datetime', isNullable: false },
      ],
      foreignKeys: [
        {
          name: 'FK_APPOINTMENT_USER',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FK_APPOINTMENT_EXPERT',
          referencedTableName: 'experts',
          referencedColumnNames: ['id'],
          columnNames: ['expert_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FK_APPOINTMENT_SERVICE',
          referencedTableName: 'services',
          referencedColumnNames: ['id'],
          columnNames: ['service_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
