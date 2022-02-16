import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LandModule } from './land/land.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';
import { LandEntity } from './land/entities/land.entity';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UserModule,
    LandModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      name: 'mysql',
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.MySQL_USERNAME,
      password: process.env.MySQL_PW,
      database: 'newsland',
      entities: [UserEntity, LandEntity],
      synchronize: true,
      charset: 'utf8mb4',
      autoLoadEntities: true,
      logging: false,
      keepConnectionAlive: true,
      timezone: 'Asia/Seoul',
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
