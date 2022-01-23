import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcryptjs'
import { UserRepository } from 'src/modules/auth/user/user.repository'

@Injectable()
export class CryptoService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  async validatePassword(
    testPassword: string,
    hashedPassword: string,
    salt: string
  ): Promise<boolean> {
    const hash = await bcrypt.hash(testPassword, salt)

    return hash === hashedPassword
  }

  hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
