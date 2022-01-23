import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthController } from 'src/modules/auth/auth.controller'
import { CryptoService } from 'src/modules/auth/crypto/crypto.service'
import { JwtStrategy } from 'src/modules/auth/jwt/jwt.service'
import { UserRepository } from 'src/modules/auth/user/user.repository'
import { UserService } from 'src/modules/auth/user/user.service'
import { EnvModule } from 'src/modules/env/env.module'
import { EnvService } from 'src/modules/env/env.service'

@Module({
  imports: [
    EnvModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        secret: envService.getString('JWT_SECRET'),
        signOptions: {
          expiresIn: envService.getNumber('JWT_EXPIRES'),
        },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  controllers: [AuthController],
  providers: [CryptoService, UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
