import { CategoryEntity } from '@src/category/category.entity';
import { BaseEntity } from '@src/shared/base.entity';
import { SubCategoryEntity } from '@src/sub-category/sub-category.entity';
import { AfterInsert, AfterLoad, AfterUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity('games')
export class GameEntity extends BaseEntity {
    @Column({ nullable: true })
    position: number;

    @Column()
    name: string;

    @OneToMany(() => SubCategoryEntity, (subCategoryEntity) => subCategoryEntity.category)
    subCategories: SubCategoryEntity[];

    @ManyToMany(() => CategoryEntity, (categoryEntity) => categoryEntity.games)
    @JoinTable({
        name: 'games_categories',
        joinColumn: { name: 'game_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    })
    categories: CategoryEntity[];

    @AfterInsert()
    @AfterUpdate()
    async nullChecks() {
        if (!this.subCategories) {
            this.subCategories = [];
        }
        if (!this.categories) {
            this.categories = [];
        }
    }
}
