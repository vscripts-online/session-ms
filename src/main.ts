import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'node:path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'session',
        protoPath: path.join(__dirname, 'proto/session.proto'),
      },
    },
  );

  const PORT = process.env.PORT;
  if (!PORT) {
    console.log('PORT expected');
    process.exit(1);
  }

  await app.listen();
  console.log(app['server'].url);
}
bootstrap();
