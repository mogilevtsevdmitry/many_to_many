import { BasePagination } from '@src/shared/pagination.dto';

export class CategoryPagination extends BasePagination {
    name: string;
    order: string;
}
