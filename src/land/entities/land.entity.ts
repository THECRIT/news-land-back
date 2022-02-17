import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
@Index(['id'])
export class LandEntity {
  @ApiProperty({ description: '고유 id , token id 기반' })
  @PrimaryColumn('int', { unique: true })
  id: number;

  @ApiProperty({ description: '사진 url' })
  @Column('varchar', { length: 400, default: '' })
  src: string;

  @ApiProperty({ description: '내용', default: '' })
  @Column('varchar', { length: 400 })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.lands)
  owner: UserEntity;

  @ApiProperty({ type: [UserEntity], description: '추천 투표자들' })
  @ManyToMany(() => UserEntity, (user) => user.upVotes)
  @JoinTable()
  upVoters: UserEntity[];

  @ApiProperty({ type: [UserEntity], description: '비추천 투표자들' })
  @ManyToMany(() => UserEntity, (user) => user.downVotes)
  @JoinTable()
  downVoters: UserEntity[];

  //아래의 칼럼은 자동 관리 됩니다.
  @ApiProperty({ description: '생성 일시' })
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty({ description: '최근 수정 일시' })
  @UpdateDateColumn()
  updated_at: Date;
}
