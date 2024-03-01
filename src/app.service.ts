import * as crypto from 'node:crypto';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { REDIS_CLIENT } from './database';
import { RedisClientType } from 'redis';
import type { Session__Output } from 'pb/session/Session';
import { BoolValue__Output } from 'pb/google/protobuf/BoolValue';

@Injectable()
export class AppService {
  @Inject(forwardRef(() => REDIS_CLIENT))
  private readonly redisClient: RedisClientType;

  async NewSession(id: number): Promise<Session__Output> {
    const key = crypto.randomBytes(16).toString('base64url');
    const result = await this.redisClient.LPUSH('session:' + id, key);
    if (!result) {
      return this.NewSession(id);
    }
    return { session: key, id };
  }

  async GetSession(id: number, session: string): Promise<BoolValue__Output> {
    const keys = await this.redisClient.LRANGE('session:' + id, 0, 100);
    return { value: keys.includes(session) };
  }

  async DelSession(id: number): Promise<BoolValue__Output> {
    const result = await this.redisClient.DEL('session:' + id + '');
    return { value: Boolean(result) };
  }
}
