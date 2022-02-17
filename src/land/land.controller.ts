import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LandService } from './land.service';
import { UpdateLandDto } from './dto/update-land.dto';
import { CreateLandDto } from './dto/create-land.dto';
import { UserService } from '../user/user.service';
import { LandEntity } from './entities/land.entity';

@Controller('land')
export class LandController {
  constructor(
    private readonly landService: LandService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async create(@Body() createLandDto: CreateLandDto, owner: string) {
    //TODO: user find by address
    const user = await this.userService.findOne(owner);
    return this.landService.create(createLandDto, user);
  }
  @Get()
  async findAll(): Promise<LandEntity[]> {
    return await this.landService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LandEntity> {
    return this.landService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLandDto: UpdateLandDto) {
    return this.landService.update(+id, updateLandDto);
  }

  @Post('/like/?=id')
  async upVote(@Query('id') id: number, @Body() owner: string) {
    const user = await this.userService.findOne(owner);
    return this.landService.upVote(id, user);
  }

  @Post('/dislike/?=id')
  async downVote(@Query('id') id: number, @Body() owner: string) {
    const user = await this.userService.findOne(owner);
    return this.landService.downVote(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landService.remove(+id);
  }
}
