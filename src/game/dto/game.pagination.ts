import { BasePagination } from '@src/shared/pagination.dto';

export class GamePagination extends BasePagination {
    categories?: number | number[];
    subCategories?: number | number[];
    name?: string | string;
    sort?: string;
}
