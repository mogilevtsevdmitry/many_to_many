import { MigrationInterface, QueryRunner } from 'typeorm';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;

export class insertSubCategoriesMigration1680703139290 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const arr = Array.from({ length: 100 }, (_, index) => index + 1);
        // insert sub-categories
        for (const i of arr) {
            const subCategory = {
                position: getRandomNumber(),
                name: `SubCategory ${i}`,
                category: getRandomNumber(),
            };
            await queryRunner.query(/* sql */ `
                insert into sub_categories("position", "name", "categoryId")
                values (${subCategory.position}, '${subCategory.name}', ${subCategory.category});
            `);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
