import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';

export const REDIS_CLIENT = Symbol('REDIS_CLIENT');

const redis_client = {
  provide: REDIS_CLIENT,
  useFactory: async () => {
    const REDIS_URI = process.env.REDIS_URI;
    if (!REDIS_URI) {
      console.log('REDIS_URI expected');
      process.exit(1);
    }

    const conn = await createClient({ url: REDIS_URI });

    conn.on('error', (error) => {
      console.log('REDIS ERROR', error);
      process.exit(1);
    });

    await conn.connect();
    console.log('Connected to redis');

    return conn;
  },
};

const providers = [redis_client];

@Global()
@Module({
  imports: [],
  providers,
  exports: [...providers],
})
export class DatabaseModule {}
