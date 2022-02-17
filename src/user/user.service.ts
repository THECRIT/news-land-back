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

  // async createUser(createUserDto: CreateUserDto) {
  //   const userExist = this.checkUserExists(createUserDto.address);
  //
  //   // if (userExist) {
  //   //   throw new UnprocessableEntityException('you are already signed up!');
  //   // }
  //   console.log('save user');
  //   await this.saveUser(createUserDto);
  //   //return this.login(createUserDto);
  // }

  async login(userLoginDto: LoginUserDto) {
    console.log(userLoginDto.address);
    const userExist = await this.checkUserExists(userLoginDto.address);
    if (!userExist) {
      console.log('you are here!');
      await this.saveUser(userLoginDto);
    }
    // auth module의 login 함수 사용
    return await this.userRepository.findOne(userLoginDto.address);
  }

  private async checkUserExists(address: string) {
    //true false test 필요
    const user = await this.userRepository.findOne({ address });
    return this.userRepository.hasId(user);
  }

  private saveUser(createUserDto: CreateUserDto) {
    console.log('save user');
    return this.userRepository.save({ ...createUserDto });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(address: string) {
    return this.userRepository.findOne({ address });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
