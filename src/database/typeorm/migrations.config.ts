import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config({ path: join(process.cwd(), '.env') });
const configService = new ConfigService();

const typeormConfig = (): DataSourceOptions => {
    const url = configService.get('DATABASE_URL');

    if (!url) {
        throw new Error('Проверьте свой .env на наличие в нем перменной DATABASE_URL для подключения к БД');
    }

    return {
        url,
        type: 'postgres',
        schema: 'public',
        entities: ['dist/**/*.entity.{ts,js}'],
        migrations: ['migrations/*_migration.ts'],
        migrationsTableName: 'migrations',
    };
};

export const appDataSource = new DataSource(typeormConfig());
