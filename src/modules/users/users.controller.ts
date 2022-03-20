import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FindUserDto } from './dto/find-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@Query() params: FindUserDto): Promise<any> {
    const [items, total] = await this.usersService.list(params);
    return {
      total,
      items: items.map((item) => item.toJSON()),
    };
  }
}
