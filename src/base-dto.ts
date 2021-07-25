export class BaseDto<Entity> {
  constructor(entity?: Entity) {
    if (entity) Object.assign(this, entity);
  }
}
