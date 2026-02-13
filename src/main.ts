import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe'
import { envs } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  )

  await app.listen(envs.PORT)
  console.log(`Products microservice is running on port ${envs.PORT}`)
}
bootstrap()
