import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsString()
  readonly address: string;

  // Optional
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  readonly password: string;


}
