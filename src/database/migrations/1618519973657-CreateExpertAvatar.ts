import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateExpertAvatar1618519973657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'expertAvatar',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'expert_id', type: 'varchar', isNullable: false },
        { name: 'image', type: 'mediumblob', isNullable: false },
        { name: 'content_type', type: 'varchar', isNullable: false },
        { name: 'original_name', type: 'varchar', isNullable: false },
        { name: 'file_name', type: 'varchar', isNullable: false },
      ],
      foreignKeys: [
        {
          name: 'FK_AVATARS_EXPERT',
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
    await queryRunner.dropTable('expertAvatar');
  }
}
