import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryPagination } from './dto';

@Injectable()
export class CategoryService {
    private readonly logger = new Logger(CategoryService.name);
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>,
    ) {}

    save(entity: Partial<CategoryEntity>) {
        return this.repository.save(entity);
    }

    async findAll(pagination: CategoryPagination) {
        const { limit = 25, offset = 0, ...where } = pagination;
        const result = await this.repository.findAndCount({
            select: ['id', 'name', 'position'],
            where,
            relations: {
                games: false,
                subCategories: false,
            },
            order: {
                id: 'ASC',
            },
            take: limit,
            skip: offset,
        });
        return result;
    }

    async find(id: number) {
        const result = await this.repository.findOneBy({ id }).catch((err) => {
            this.logger.error(err);
            return null;
        });
        if (!result) {
            throw new NotFoundException(`Не могу найти категорию по идентификатору ${id}`);
        }
        return result;
    }

    async findByIds(ids: number[]) {
        return this.repository.find({ where: { id: In(ids) } }).catch((err) => {
            this.logger.error(err);
            return [];
        });
    }
}
