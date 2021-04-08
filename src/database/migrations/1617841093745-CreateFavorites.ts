import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFavorites1617841093745 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'favorites',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'user_id', type: 'varchar', isNullable: false },
        { name: 'expert_id', type: 'varchar', isNullable: false },
      ],
      foreignKeys: [
        {
          name: 'FK_USER',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FK_EXPERT',
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
    await queryRunner.dropTable('favorites');
  }
}
