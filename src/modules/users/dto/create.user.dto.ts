import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  @MinLength(8)
  public password: string;

  @IsString()
  @IsOptional()
  public name: string;
}
