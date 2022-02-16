import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index, JoinTable, ManyToMany, OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { LandEntity } from '../../land/entities/land.entity';

@Entity()
@Index(['address'])
export class UserEntity {
  @ApiProperty({ description: '고유 address' })
  @PrimaryColumn('varchar', { length: 255, unique: true })
  address: string;

  @ApiProperty({ description: '닉네임' })
  @Column('varchar', { length: 40 })
  username: string;

  @ApiProperty({ type: [LandEntity], description: 'Land 리스트' })
  @OneToMany(() => LandEntity, (land) => land.owner)
  lands: LandEntity[];

  @ApiProperty({ type: [LandEntity], description: '투표한 Land' })
  @ManyToMany(() => LandEntity, (land) => land.voters)
  votes: LandEntity[];

  //아래의 칼럼은 자동 관리 됩니다.
  @ApiProperty({ description: '생성 일시' })
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty({ description: '최근 수정 일시' })
  @UpdateDateColumn()
  updated_at: Date;
}
