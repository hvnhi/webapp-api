import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class FindUserDto {
  @Type(() => Number)
  @IsNumber()
  public page: number;

  @Type(() => Number)
  @IsNumber()
  public limit: number;
}
