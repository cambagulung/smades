import { SetMetadata } from '@nestjs/common';

export const Can = (...args: string[]) => SetMetadata('ability', args);
