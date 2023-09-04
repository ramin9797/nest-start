import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const port = process.env.PORT||3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

//swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Urok to nestjs")
    .setDescription("Description po nest api")
    .setVersion('1.0')
    .addTag("Nestjs")
    .build()

  const swaggerDoc = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('/api/docs',app,swaggerDoc);


  await app.listen(port,()=>console.log("App run on port ",port));
}
bootstrap();
