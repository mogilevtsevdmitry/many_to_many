import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { asyncOptions } from './typeorm/typeorm.factory';

@Module({
    imports: [TypeOrmModule.forRootAsync(asyncOptions())],
    exports: [TypeOrmModule],
})
export class DatabaseModule {}
