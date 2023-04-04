import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from './database/database.module';
import { GameModule } from './game/game.module';
import { SubCategoryModule } from './sub-category/sub-category.module';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }), CategoryModule, SubCategoryModule, GameModule, DatabaseModule],
})
export class AppModule {}
