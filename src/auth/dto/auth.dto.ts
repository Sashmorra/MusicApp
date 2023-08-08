import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  email: String;
  @ApiProperty()
  password: String;
}
