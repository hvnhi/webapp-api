import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public username: string;

  @IsString()
  public name: string;

  @IsString()
  @MinLength(8)
  public password: string;
}
