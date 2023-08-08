import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserDto } from './dto/auth.dto';
import { UserModel } from 'src/models/user.model';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async registration(dto: UserDto) {
    const { email, password } = dto;
    const candidate = await this.userService.findByEmail(email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(password, 4);
    const user = await this.userService.create({ email, hashPassword });
    return this.generateToken(user);
  }
  async login(dto: UserDto) {
    const { email, password } = dto;
    const candidate = await this.userService.findByEmail(email);
    if (!candidate) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    const isValidPassword = await bcrypt.compare(
      password,
      candidate.hashPassword,
    );
    if (!isValidPassword) {
      throw new HttpException(
        'Неправильный логин или пароль',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.generateToken(candidate);
  }

  async generateToken(user) {
    const payload = {id:user.id, email:user.enmail, favoritesId:user.favoritesId};
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
