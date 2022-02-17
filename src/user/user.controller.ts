import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from "./entities/user.entity";

@Controller('account')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async SignUp(
  //   @Body() createUserDto: CreateUserDto,
  // ): Promise<void> {
  //   return this.userService.createUser(createUserDto);
  // }

  @Post('/login')
  async login(
    @Body() userLoginDto: LoginUserDto,
  ): Promise<UserEntity | undefined> {
    return await this.userService.login(userLoginDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
