import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './game.controller';
import { GameEntity } from './game.entity';
import { GameService } from './game.service';
import { GameRepositoryService } from './game-repository.service';

@Module({
    providers: [GameService, GameRepositoryService],
    controllers: [GameController],
    imports: [TypeOrmModule.forFeature([GameEntity])],
    exports: [GameService],
})
export class GameModule {}
