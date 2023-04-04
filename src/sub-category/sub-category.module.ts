import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryEntity } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryRepositoryService } from './sub-category-repository.service';

@Module({
    providers: [SubCategoryService, SubCategoryRepositoryService],
    controllers: [SubCategoryController],
    imports: [TypeOrmModule.forFeature([SubCategoryEntity])],
    exports: [SubCategoryService],
})
export class SubCategoryModule {}
