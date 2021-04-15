import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class CreateThumbnailColumn1618523764339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('thumbnails',
      { name: 'file_name', type: 'varchar', isNullable: false } as TableColumn);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('thumbnails', 'file_name');
  }
}
