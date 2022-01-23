import { ApiProperty } from '@nestjs/swagger'
import * as bcrypt from 'bcryptjs'
import { Exclude } from 'class-transformer'
import * as faker from 'faker'
import * as R from 'ramda'
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm'
import { IUserTestData } from 'src/modules/auth/user/user.types'
import { Task } from 'src/modules/tasks/task/task.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  username: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column()
  salt: string

  @Exclude()
  @OneToMany(() => Task, (task) => task.user, { eager: false })
  tasks: Task[]

  public static async getTestData(data?: IUserTestData, tasks?: Task[]) {
    return R.merge(
      {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        salt: await bcrypt.genSalt(),
        tasks,
      },
      data
    )
  }
}
