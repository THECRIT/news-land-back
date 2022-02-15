import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('NewsLand API')
    .setDescription('nestjs API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const firebaseConfig = require('./service-account-credentials.json');
  // logger.info(firebaseConfig);
  // admin.initializeApp({
  //   credential: admin.credential.cert(firebaseConfig),
  // });


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);

  //typeORM 도입시 keepConnectionAlive: true 추가
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();