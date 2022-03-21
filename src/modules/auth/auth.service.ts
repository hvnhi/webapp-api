import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/common/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getOne({ username });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const isValid = await bcrypt.compareSync(password, user.password);
    if (isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    } else {
      throw new BadRequestException('Invalid password');
    }
  }

  async login(user: User) {
    const payload = { username: user.username, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
