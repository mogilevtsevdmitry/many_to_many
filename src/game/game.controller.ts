import { Controller, Get, Query } from '@nestjs/common';
import { GameService } from './game.service';
import { GamePagination } from './dto';

@Controller('game')
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @Get()
    find(@Query() query: GamePagination) {
        return this.gameService.find(query);
    }
}
