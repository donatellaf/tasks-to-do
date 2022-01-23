import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { CryptoService } from 'src/modules/auth/crypto/crypto.service'
import { IJwtPayload } from 'src/modules/auth/jwt/jwt.types'
import { CredentialsDTO } from 'src/modules/auth/user/user.dto'
import { User } from 'src/modules/auth/user/user.entity'
import { UserRepository } from 'src/modules/auth/user/user.repository'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly cryptoService: CryptoService
  ) {}

  async signUp(credentialsDTO: CredentialsDTO): Promise<User> {
    const salt = await bcrypt.genSalt()
    const password = await this.cryptoService.hashPassword(
      credentialsDTO.password,
      salt
    )

    const createDTO = {
      username: credentialsDTO.username,
      salt,
      password,
    }

    return this.userRepository.signUp(createDTO)
  }

  async signIn(
    credentialsDTO: CredentialsDTO
  ): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({
      username: credentialsDTO.username,
    })

    const isPasswordValid = await this.cryptoService.validatePassword(
      credentialsDTO.password,
      user.password,
      user.salt
    )

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: IJwtPayload = { username: credentialsDTO.username }
    const accessToken = this.jwtService.sign(payload)

    return { accessToken }
  }
}
