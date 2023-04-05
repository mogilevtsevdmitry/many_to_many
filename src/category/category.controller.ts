import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryPagination, CreateCategoryDto } from './dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @Post()
    create(@Body() dto: CreateCategoryDto) {
        return this.categoryService.save(dto);
    }

    @Get()
    findAll(@Query() params: CategoryPagination) {
        return this.categoryService.findAll(params);
    }
}
