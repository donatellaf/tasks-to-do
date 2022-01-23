import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from 'src/app.module'
import { EnvService } from 'src/modules/env/env.service'
import { TransformInterceptor } from 'src/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.enableCors()

  const options = new DocumentBuilder()
    .setTitle('Nest REST API')
    .setDescription('Example REST API written on top of Nest.js.')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api', app, document)

  const envConfig = app.get<EnvService>('EnvService')
  await app.listen(envConfig.getNumber('PORT'))
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap()
