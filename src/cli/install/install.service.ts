import { Injectable } from '@nestjs/common';
import { Command, CommandArguments, _cli } from '@squareboat/nest-console';

@Injectable()
export class InstallService {
  @Command('install', {
    desc: 'Test Command',
    args: { name: { req: false } },
  })
  sayHello(args: CommandArguments) {
    console.log(args);
    _cli.info(`Hello ${args.name || 'world'}!`);
    return;
  }
}
