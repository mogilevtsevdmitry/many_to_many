import { CategoryEntity } from '@src/category/category.entity';
import { GameEntity } from '@src/game/game.entity';
import { BaseEntity } from '@src/shared/base.entity';
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('sub_categories')
export class SubCategoryEntity extends BaseEntity {
    @Column({ nullable: true })
    position: number;

    @Column()
    name: string;

    @ManyToOne(() => CategoryEntity, (category) => category.subCategories)
    category: CategoryEntity;

    @ManyToMany(() => GameEntity, (game) => game.subCategories)
    @JoinTable({
        name: 'sub_categories_games',
        joinColumn: { name: 'sub_category_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'game_id', referencedColumnName: 'id' },
    })
    games: GameEntity[];

    @AfterLoad()
    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
        if (!this.games) {
            this.games = [];
        }
    }
}
