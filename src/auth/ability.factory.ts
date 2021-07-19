import { Injectable } from '@nestjs/common';
import { User } from './users/entities/user.entity';

@Injectable()
export class AbilityFactory {
  build(user: User) {
    return user;
  }
}
