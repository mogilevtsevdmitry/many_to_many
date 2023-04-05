export class CreateGameDto {
    name: string;
    categories: number[];
    subCategories?: number[];
    position?: number;
}
