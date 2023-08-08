import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/auth.dto';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  registration(@Body() dto: UserDto) {
    return this.authService.registration(dto);
  }

  @Post('/login')
  login(@Body() dto: UserDto) {
    return this.authService.login(dto);
  }
}
