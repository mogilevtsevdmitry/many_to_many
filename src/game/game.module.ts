import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '@src/category/category.module';
import { SubCategoryModule } from '@src/sub-category/sub-category.module';
import { GameController } from './game.controller';
import { GameEntity } from './game.entity';
import { GameService } from './game.service';

@Module({
    providers: [GameService],
    controllers: [GameController],
    imports: [TypeOrmModule.forFeature([GameEntity]), CategoryModule, SubCategoryModule],
    exports: [GameService],
})
export class GameModule {}
