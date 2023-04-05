import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertMockDataMigration1680678510672 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const arr = Array.from({ length: 100 }, (_, index) => index + 1);
        // insert categories
        for (const i of arr) {
            const category = {
                position: i,
                name: `Category ${i}`,
            };
            await queryRunner.query(/* sql */ `
                insert into categories("position", "name")
                values (${category.position}, '${category.name}');
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
