import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateLandDto } from './dto/create-land.dto';
import { UpdateLandDto } from './dto/update-land.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LandEntity } from './entities/land.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class LandService {
  constructor(
    @InjectRepository(LandEntity, 'mysql')
    private landRepository: Repository<LandEntity>,
  ) {}

  create(createLandDto: CreateLandDto, user: UserEntity) {
    const land = this.landRepository.create({ ...createLandDto });
    land.owner = user;
    return this.landRepository.save(land);
  }

  findAll() {
    return this.landRepository.find();
  }

  findOne(id: number) {
    return this.landRepository
      .createQueryBuilder('land')
      .leftJoinAndSelect('land.voter', 'voter')
      .leftJoinAndSelect('land.owner', 'owner')
      .where('land.id = :id', { id })
      .getOne();
  }

  async update(id: number, updateLandDto: UpdateLandDto) {
    try {
      await this.landRepository.update({ id: id }, { ...updateLandDto });
      return 'success';
    } catch (e) {
      throw new Error(e);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} land`;
  }

  async vote(id: number, user: UserEntity) {
    const land = await this.findOne(id);
    if (land.voters.includes(user)) {
      throw new Error('you already voted this Land');
    } else {
      land.voters.push(user);
      return 'success';
    }
  }
}
