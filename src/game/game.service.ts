import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@src/category/category.service';
import { SubCategoryService } from '@src/sub-category/sub-category.service';
import { FindManyOptions, FindOptionsWhere, In, Repository } from 'typeorm';
import { CreateGameDto } from './dto';
import { GamePagination } from './dto/game.pagination';
import { GameEntity } from './game.entity';

type GameFilterType = Pick<GamePagination, 'categories' | 'name' | 'subCategories'>;

@Injectable()
export class GameService {
    private readonly logger = new Logger(GameService.name);
    constructor(
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>,
        private readonly categoryService: CategoryService,
        private readonly subCategoryService: SubCategoryService,
    ) {}

    async save(dto: CreateGameDto) {
        if (!dto.categories) {
            throw new BadRequestException('Категория обязательно');
        }

        const categories = await this.categoryService.findByIds(dto.categories);
        const game = this.gameRepository.create({
            name: dto.name,
            position: dto?.position,
            categories,
        });

        if (dto?.subCategories) {
            const subCategories = await this.subCategoryService.findByIds(dto.subCategories);
            game.subCategories = subCategories;
        }

        return this.gameRepository.save(game);
    }

    async find(pagination: GamePagination) {
        const { limit = 10, offset = 0, sort = '-createdAt', ...filter } = pagination;

        const where: FindOptionsWhere<GameEntity> = await this.getWhere(filter);
        const order: FindManyOptions<GameEntity>['order'] =
            sort[0] === '-' ? { [sort.substring(1)]: 'DESC' } : { [sort]: 'ASC' };

        return this.gameRepository
            .findAndCount({
                where,
                take: limit,
                skip: offset,
                order,
                // relations: {
                //     categories: true, // просто для проверки корректности
                // },
            })
            .catch((err) => {
                this.logger.error(err);
                return [[], 0];
            });
    }

    private async getWhere(filter: GameFilterType): Promise<FindOptionsWhere<GameEntity>> {
        const where: FindOptionsWhere<GameEntity> = {};
        const getValues = <T, R>(value: T): R => (Array.isArray(value) ? value : [value]) as R;

        if (filter?.categories) {
            where.categories = {
                id: In(getValues<number | number[], number[]>(filter.categories)),
            };
        }

        if (filter?.subCategories) {
            where.subCategories = {
                id: In(getValues<number | number[], number[]>(filter.subCategories)),
            };
        }

        if (filter?.name) {
            where.name = In(getValues<string | string[], string[]>(filter.name));
        }

        return where;
    }
}
