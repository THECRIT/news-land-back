import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index, JoinTable, ManyToMany, ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { UserEntity } from '../../user/entities/user.entity';

@Entity()
@Index(['id'])
export class LandEntity {
  @ApiProperty({ description: '고유 id , token id 기반' })
  @PrimaryColumn('int', { unique: true })
  id: number;

  @ApiProperty({ description: '사진 url' })
  @Column('varchar', { length: 400 })
  url: string;

  @ApiProperty({ description: '연결 주소' })
  @Column('varchar', { length: 400 })
  link: string;

  @ApiProperty({ description: '연결 주소' })
  @Column('varchar', { length: 400 })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.lands)
  owner: UserEntity;

  @ApiProperty({ type:[UserEntity],description: '투표자들' })
  @ManyToMany(() => UserEntity, (user) => user.votes)
  @JoinTable()
  voters: UserEntity[];

  //아래의 칼럼은 자동 관리 됩니다.
  @ApiProperty({ description: '생성 일시' })
  @CreateDateColumn()
  created_at: Date;
  @ApiProperty({ description: '최근 수정 일시' })
  @UpdateDateColumn()
  updated_at: Date;
}
