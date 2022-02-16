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
  async create(@Body() createLandDto: CreateLandDto) {
    //TODO: user find by address
    const user = await this.userService.findOne('sfsefsfd');
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

  @Post('/vote/?=id')
  async vote(@Query('id') id: number) {
    const user = await this.userService.findOne('sfsefsfd');
    return this.landService.vote(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landService.remove(+id);
  }
}
