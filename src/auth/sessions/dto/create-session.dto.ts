import { UserDto } from 'src/auth/users/dto/user.dto';

export class CreateSessionDto {
  user: UserDto;
  device: string;
  ip: string;
}
