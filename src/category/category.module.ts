import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryRepositoryService } from './category-repository.service';

@Module({
    providers: [CategoryService, CategoryRepositoryService],
    controllers: [CategoryController],
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    exports: [CategoryService],
})
export class CategoryModule {}
