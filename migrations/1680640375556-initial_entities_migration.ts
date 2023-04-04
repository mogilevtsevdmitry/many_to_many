import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialEntitiesMigration1680640375556 implements MigrationInterface {
    name = 'initialEntitiesMigration1680640375556';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "sub_categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "position" integer, "name" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_f319b046685c0e07287e76c5ab1" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "position" integer, "name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "games" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "position" integer, "name" character varying NOT NULL, CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "sub_categories_games" ("sub_category_id" integer NOT NULL, "game_id" integer NOT NULL, CONSTRAINT "PK_792ad4ab1dd6342a799026d7abe" PRIMARY KEY ("sub_category_id", "game_id"))`,
        );
        await queryRunner.query(
            `CREATE INDEX "IDX_08b3f582dd8a4b94cc748195e8" ON "sub_categories_games" ("sub_category_id") `,
        );
        await queryRunner.query(`CREATE INDEX "IDX_2a2ab64671100349c13953339b" ON "sub_categories_games" ("game_id") `);
        await queryRunner.query(
            `CREATE TABLE "category_games" ("category_id" integer NOT NULL, "game_id" integer NOT NULL, CONSTRAINT "PK_e50814d4ca04d3ca81a056291e6" PRIMARY KEY ("category_id", "game_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_d4672ad275f29590dd4e9fee16" ON "category_games" ("category_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_ca5ffe56a25423375c0ebe87b4" ON "category_games" ("game_id") `);
        await queryRunner.query(
            `CREATE TABLE "games_categories" ("game_id" integer NOT NULL, "category_id" integer NOT NULL, CONSTRAINT "PK_690ede536c538d87d67441cea61" PRIMARY KEY ("game_id", "category_id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_4db3f4f547cd8830cc61d8efce" ON "games_categories" ("game_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a3b422d7dff3cc44717934fd04" ON "games_categories" ("category_id") `);
        await queryRunner.query(
            `ALTER TABLE "sub_categories" ADD CONSTRAINT "FK_dfa3adf1b46e582626b295d0257" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "sub_categories_games" ADD CONSTRAINT "FK_08b3f582dd8a4b94cc748195e89" FOREIGN KEY ("sub_category_id") REFERENCES "sub_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "sub_categories_games" ADD CONSTRAINT "FK_2a2ab64671100349c13953339b4" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "category_games" ADD CONSTRAINT "FK_d4672ad275f29590dd4e9fee165" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "category_games" ADD CONSTRAINT "FK_ca5ffe56a25423375c0ebe87b4c" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "games_categories" ADD CONSTRAINT "FK_4db3f4f547cd8830cc61d8efce8" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "games_categories" ADD CONSTRAINT "FK_a3b422d7dff3cc44717934fd041" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "games_categories" DROP CONSTRAINT "FK_a3b422d7dff3cc44717934fd041"`);
        await queryRunner.query(`ALTER TABLE "games_categories" DROP CONSTRAINT "FK_4db3f4f547cd8830cc61d8efce8"`);
        await queryRunner.query(`ALTER TABLE "category_games" DROP CONSTRAINT "FK_ca5ffe56a25423375c0ebe87b4c"`);
        await queryRunner.query(`ALTER TABLE "category_games" DROP CONSTRAINT "FK_d4672ad275f29590dd4e9fee165"`);
        await queryRunner.query(`ALTER TABLE "sub_categories_games" DROP CONSTRAINT "FK_2a2ab64671100349c13953339b4"`);
        await queryRunner.query(`ALTER TABLE "sub_categories_games" DROP CONSTRAINT "FK_08b3f582dd8a4b94cc748195e89"`);
        await queryRunner.query(`ALTER TABLE "sub_categories" DROP CONSTRAINT "FK_dfa3adf1b46e582626b295d0257"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a3b422d7dff3cc44717934fd04"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4db3f4f547cd8830cc61d8efce"`);
        await queryRunner.query(`DROP TABLE "games_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ca5ffe56a25423375c0ebe87b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4672ad275f29590dd4e9fee16"`);
        await queryRunner.query(`DROP TABLE "category_games"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a2ab64671100349c13953339b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08b3f582dd8a4b94cc748195e8"`);
        await queryRunner.query(`DROP TABLE "sub_categories_games"`);
        await queryRunner.query(`DROP TABLE "games"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "sub_categories"`);
    }
}
