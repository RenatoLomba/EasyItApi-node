import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTestimonials1618240308775 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'testimonials',
      columns: [
        { name: 'id', type: 'varchar', isPrimary: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
        { name: 'user_id', type: 'varchar', isNullable: false },
        { name: 'expert_id', type: 'varchar', isNullable: false },
        { name: 'description', type: 'varchar', isNullable: true },
        { name: 'stars', type: 'double(4,2)', isNullable: false },
      ],
      foreignKeys: [
        {
          name: 'FK_TESTIMONIAL_USER',
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
          columnNames: ['user_id'],
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        },
        {
          name: 'FK_TESTIMONIAL_EXPERT',
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
    await queryRunner.dropTable('testimonials');
  }
}
