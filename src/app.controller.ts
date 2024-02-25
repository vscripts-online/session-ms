import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import type { SessionUser__Output } from './pb/session/SessionUser';
import type { Session__Output } from './pb/session/Session';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @GrpcMethod('SessionService')
  NewSession(data: SessionUser__Output) {
    const { id } = data;
    return this.appService.NewSession(id);
  }

  @GrpcMethod('SessionService')
  GetSession(data: Session__Output) {
    const { id, session } = data;
    return this.appService.GetSession(id, session);
  }

  @GrpcMethod('SessionService')
  DelSession(data: SessionUser__Output) {
    const { id } = data;
    return this.appService.DelSession(id);
  }
}
