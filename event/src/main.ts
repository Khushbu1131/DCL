import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';


async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

 app.useStaticAssets(join(__dirname, "..", "uploads"), {
  prefix: "/uploads",
});
 app.enableCors();

  // Prefix all routes with /api
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Event Buddy API')
    .setDescription('Backend API for the Event Booking System')
    .setVersion('1.0')
    .addBearerAuth() // Enables JWT Authorization header
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI route: http://localhost:3000/api/docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
