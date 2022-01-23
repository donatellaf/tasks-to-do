import { ConflictException } from '@nestjs/common'
import { Repository, EntityRepository } from 'typeorm'
import { CreateUserDTO } from 'src/modules/auth/user/user.dto'
import { User } from 'src/modules/auth/user/user.entity'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(createDTO: CreateUserDTO): Promise<User> {
    const user = this.create()
    user.username = createDTO.username
    user.salt = createDTO.salt
    user.password = createDTO.password

    try {
      await user.save()
      return user
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exists')
      } else {
        throw error
      }
    }
  }
}
