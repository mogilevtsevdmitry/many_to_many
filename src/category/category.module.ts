import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Module({
    providers: [CategoryService],
    controllers: [CategoryController],
    imports: [TypeOrmModule.forFeature([CategoryEntity])],
    exports: [CategoryService],
})
export class CategoryModule {}
