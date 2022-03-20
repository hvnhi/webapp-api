import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.getOne({ username });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }
    const isValid = await bcrypt.compareSync(pass, user.password);
    if (isValid) {
      return user;
    } else {
      throw new BadRequestException('Invalid password');
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
