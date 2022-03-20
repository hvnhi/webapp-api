import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create.user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  async list(@Query() params: FindUserDto): Promise<any> {
    const [items, total] = await this.usersService.list(params);
    return {
      total,
      items: items.map((item) => item.toJSON()),
    };
  }
}
