import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/common/base.service';
import { User } from 'src/common/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(User);
  }

  async createUser(info: CreateUserDto): Promise<User> {
    const user = new User();
    user.fill(info, ['username', 'password', 'name']);
    return this.userRepository.save(user);
  }
}
