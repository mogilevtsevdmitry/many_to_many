import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategoryEntity } from './sub-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '@src/category/category.module';

@Module({
    providers: [SubCategoryService],
    controllers: [SubCategoryController],
    imports: [TypeOrmModule.forFeature([SubCategoryEntity]), CategoryModule],
    exports: [SubCategoryService],
})
export class SubCategoryModule {}
