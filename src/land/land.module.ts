import { Module } from '@nestjs/common';
import { LandService } from './land.service';
import { LandController } from './land.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { LandEntity } from './entities/land.entity';
import { UserService } from "../user/user.service";
import { UserEntity } from "../user/entities/user.entity";

@Module({
  imports : [TypeOrmModule.forFeature([LandEntity, UserEntity], 'mysql')],
  controllers: [LandController],
  providers: [LandService, UserService],
})
export class LandModule {}
