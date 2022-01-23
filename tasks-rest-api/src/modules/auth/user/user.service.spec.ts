import { TestingModule } from '@nestjs/testing'
import * as bcrypt from 'bcryptjs'
import { AuthModule } from 'src/modules/auth/auth.module'
import { CryptoService } from 'src/modules/auth/crypto/crypto.service'
import { AuthTestingEntityService } from 'src/modules/auth/testing-entity.service'
import { User } from 'src/modules/auth/user/user.entity'
import { UserService } from 'src/modules/auth/user/user.service'
import { TasksTestingEntityService } from 'src/modules/tasks/testing-entity.service'
import { bootstrap } from 'src/modules/testing/main'
import { TestingDatabaseService } from 'src/modules/testing/testing-database.service'

describe('[service] UserService', () => {
  let userService: UserService
  let databaseService: TestingDatabaseService
  let cryptoService: CryptoService

  let authEntity: AuthTestingEntityService

  beforeAll(async () => {
    const app: TestingModule = await bootstrap({
      imports: [AuthModule],
      providers: [AuthTestingEntityService, TasksTestingEntityService],
    })

    userService = app.get<UserService>(UserService)
    databaseService = app.get<TestingDatabaseService>(TestingDatabaseService)
    cryptoService = app.get<CryptoService>(CryptoService)

    authEntity = app.get<AuthTestingEntityService>(AuthTestingEntityService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  describe('signUp', () => {
    it('should create new user', async () => {
      const { username, password, salt } = await User.getTestData()
      const passwordHashed = await cryptoService.hashPassword(password, salt)

      // @ts-ignore
      jest.spyOn(bcrypt, 'genSalt').mockReturnValue(salt)

      const user = await userService.signUp({ username, password })
      const users = await authEntity.listUsers()

      expect(users).toHaveLength(1)
      expect(user).toMatchObject({
        username,
        password: passwordHashed,
        salt,
      })
    })
  })

  describe('signIn', () => {
    it('should sign in', async () => {
      const { username, password, salt } = await User.getTestData()
      const passwordHashed = await cryptoService.hashPassword(password, salt)
      await authEntity.createUser({ username, password: passwordHashed, salt })

      const user = await userService.signIn({ username, password })

      expect(user).toHaveProperty('accessToken')
    })

    describe('when invalid credentials', () => {
      it('should throw error', async () => {
        const { username, password } = await User.getTestData()
        await authEntity.createUser({ username })

        const singIn = userService.signIn({ username, password })

        await expect(singIn).rejects.toBeTruthy()
      })
    })
  })
})
