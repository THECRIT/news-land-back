import {
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLandDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(900)
  readonly id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly url: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly link: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly content: string;
}
