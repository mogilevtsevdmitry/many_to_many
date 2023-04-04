import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    // ConfigService
    const configService = app.get(ConfigService);

    const port = configService.get<number>('API_PORT', 3000);

    await app.listen(port, () => {
        Logger.debug(`APP started on http://localhost:${port}`, 'MAIN');
    });
}
bootstrap();
