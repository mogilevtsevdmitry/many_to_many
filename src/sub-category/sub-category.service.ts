import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@src/category/category.service';
import { In, Repository } from 'typeorm';
import { CreateSubCategoryDto } from './dto';
import { SubCategoryEntity } from './sub-category.entity';

@Injectable()
export class SubCategoryService {
    private readonly logger = new Logger(SubCategoryService.name);

    constructor(
        @InjectRepository(SubCategoryEntity)
        private readonly repository: Repository<SubCategoryEntity>,
        private readonly categoryService: CategoryService,
    ) {}

    async save(dto: CreateSubCategoryDto) {
        const category = await this.categoryService.find(dto.category);

        return this.repository.save({
            name: dto.name,
            category,
            position: dto?.position,
        });
    }

    async findByIds(ids: number[]) {
        return this.repository.find({ where: { id: In(ids) } }).catch((err) => {
            this.logger.error(err);
            return [];
        });
    }
}
