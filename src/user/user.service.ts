import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, 'mysql')
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExist = this.checkUserExists(createUserDto.address);

    if (userExist) {
      throw new UnprocessableEntityException('you are already signed up!');
    }
    await this.saveUser(createUserDto);
    return this.login(createUserDto);
  }

  async login(userLoginDto: LoginUserDto) {
    const userExist = await this.checkUserExists(userLoginDto.address);
    if (!userExist) {
      await this.createUser(userLoginDto);
    }
    // auth module의 login 함수 사용
    return 'success';
  }

  private async checkUserExists(address: string) {
    //true false test 필요
    return this.userRepository.findOne({ address });
  }

  private saveUser(createUserDto: CreateUserDto) {
    return this.userRepository.save({ ...createUserDto });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
