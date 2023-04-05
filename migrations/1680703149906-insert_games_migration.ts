import { MigrationInterface, QueryRunner } from 'typeorm';

const getRandomNumber = () => Math.floor(Math.random() * 100) + 1;
const getRandomUniqueArray = (maxNum = 99) => {
    const minSize = 40;
    const maxSize = 90;
    const minNum = 1;
    const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    const arr = [];

    for (let i = 0; i < size; i++) {
        const num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        arr.push(num);
    }

    return [...new Set(arr)];
};

export class insertGamesMigration1680703149906 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const arr = Array.from({ length: 100 }, (_, index) => index + 1);

        for (const i of arr) {
            const game = {
                position: getRandomNumber(),
                name: `Game ${i}`,
            };
            // insert game
            await queryRunner.query(/* sql */ `
                insert into games("position", "name")
                values (${game.position}, '${game.name}');
            `);

            // insert game - category
            const categories = getRandomUniqueArray();
            for (const categoryId of categories) {
                await queryRunner.query(/* sql */ `
                    insert into games_categories("game_id", "category_id")
                    values (${i}, ${categoryId});
                `);
            }

            // insert game - sub-category
            const subCategories = getRandomUniqueArray();
            for (const subCategoryId of subCategories) {
                await queryRunner.query(/* sql */ `
                    insert into sub_categories_games("game_id", "sub_category_id")
                    values (${i}, ${subCategoryId});
                `);
            }
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
