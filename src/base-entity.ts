import { BaseEntity as CoreBaseEntity } from 'typeorm';

class LocalBaseEntity<CreateDto> extends CoreBaseEntity {
  constructor(createDto?: CreateDto) {
    super();

    if (createDto) Object.assign(this, createDto);
  }

  get toJson(): string {
    return JSON.stringify(this);
  }
}

export { LocalBaseEntity as BaseEntity };
