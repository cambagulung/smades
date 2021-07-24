import { BaseEntity } from 'typeorm';

export abstract class AbastractEntity extends BaseEntity {
  get toJson(): string {
    return JSON.stringify(this);
  }
}
