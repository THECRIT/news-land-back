import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsEmail()
  readonly address: string;

  // Optional
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly password: string;


}
