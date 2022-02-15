import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LandModule } from './land/land.module';

@Module({
  imports: [UserModule, LandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
