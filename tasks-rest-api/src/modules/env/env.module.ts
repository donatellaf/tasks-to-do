import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EnvService } from 'src/modules/env/env.service'

type TNodeEnv = 'development' | 'test' | 'production' | 'ci'

const getEnvFilePath = (nodeEnv?: TNodeEnv) =>
  `.env.${nodeEnv}`

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvFilePath(process.env.NODE_ENV as TNodeEnv),
    }),
  ],
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
