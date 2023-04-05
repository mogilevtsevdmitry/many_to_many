import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const options = async (config: ConfigService): Promise<TypeOrmModuleOptions> => {
    const url = await config.get('DATABASE_URL');
    const logging = (await config.get('IS_PROD')) === 'false';

    if (!url) {
        throw new Error('Проверьте свой .env на наличие в нем перменной DATABASE_URL для подключения к БД');
    }

    return {
        url,
        type: 'postgres',
        schema: 'public',
        entities: ['dist/**/*.entity.{ts,js}'],
        logging,
    };
};
