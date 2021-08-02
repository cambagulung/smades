export class BaseDto<E> {
  constructor(data?: E) {
    Object.assign(this, data);
  }
}
