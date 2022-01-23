import { Injectable } from '@nestjs/common'
import { User } from 'src/modules/auth/user/user.entity'
import { IUserTestData } from 'src/modules/auth/user/user.types'
import { TestingEntityService } from 'src/modules/testing/testing-entity.service'

export type IConstructorOf<TEntity> = new () => TEntity

@Injectable()
export class AuthTestingEntityService extends TestingEntityService {
  public async createUser(data?: IUserTestData) {
    return this.create(User, await User.getTestData(data))
  }

  public listUsers() {
    return this.list<User>('user')
  }
}
