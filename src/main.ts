import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const config = new DocumentBuilder()
    .setTitle('My API')                 // Заголовок документации
    .setDescription('API description')  // Описание
    .setVersion('1.0')                  // Версия
    .addBearerAuth()                   // Добавим JWT авторизацию (если нужно)
    .build();

  const document = SwaggerModule.createDocument(app, config);
    app.use(
      '/docs',
      apiReference({
        content: document,
        theme: 'deepSpace',
        layout: 'modern',
        defaultHttpClient: {
          targetKey: 'node',
          clientKey: 'axios',
        },
        persistAuth: true,
        authentication: {
          preferredSecurityScheme: 'token',
          securitySchemes: {
            token: {
              
            },
          },
        },
      }),
    );
      app.listen(process.env.PORT ?? 3001);
}
bootstrap();
