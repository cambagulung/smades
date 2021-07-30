import {
  createParamDecorator,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityNotFoundError, getRepository } from 'typeorm';

export const Entity = createParamDecorator(async (data: string) => {
  Logger.log(data);
  try {
    // return await getRepository(target).findOneOrFail(options);
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      throw new NotFoundException(e.message);
    }

    throw e;
  }
});
