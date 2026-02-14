import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { envs } from './config'
import { Logger } from '@nestjs/common'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const logger = new Logger('Main')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.PORT,
      },
    },
  )

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen()
  logger.log(`Products microservice is running on port ${envs.PORT}`)
}
bootstrap()
