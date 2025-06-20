import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(username: string, email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.usersService.create(username, email, hashed);
    return this.login(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN'),
      }),
    };
  }
}
