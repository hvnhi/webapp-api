import { BadRequestException, Injectable } from '@nestjs/common';
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
    const user = await this.repository.findOne({ username: info.username });
    if (user) {
      throw new BadRequestException('User does not exist');
    }
    const newUser = new User();
    newUser.fill(info, ['username', 'password', 'name']);
    return this.userRepository.save(newUser);
  }
}
