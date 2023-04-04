import { GameEntity } from '@src/game/game.entity';
import { BaseEntity } from '@src/shared/base.entity';
import { SubCategoryEntity } from '@src/sub-category/sub-category.entity';
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('categories')
export class CategoryEntity extends BaseEntity {
    @Column({ nullable: true })
    position: number;

    @Column()
    name: string;

    @OneToMany(() => SubCategoryEntity, (subCategoryEntity) => subCategoryEntity.category)
    subCategories: SubCategoryEntity[];

    @ManyToMany(() => GameEntity, (gameEntity) => gameEntity.categories)
    @JoinTable({
        name: 'category_games',
        joinColumn: { name: 'category_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'game_id', referencedColumnName: 'id' },
    })
    games: GameEntity[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
        if (!this.subCategories) {
            this.subCategories = [];
        }
        if (!this.games) {
            this.games = [];
        }
    }
}
