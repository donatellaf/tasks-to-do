import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import * as faker from 'faker'
import * as R from 'ramda'
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm'
import { User } from 'src/modules/auth/user/user.entity'
import { ITaskTestData, TaskStatus } from 'src/modules/tasks/task/task.types'

@Entity()
export class Task extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  title: string

  @ApiProperty()
  @Column()
  description: string

  @ApiProperty()
  @Column()
  status: TaskStatus

  @Exclude()
  @ManyToOne(() => User, (user) => user.tasks, { eager: false })
  user: User

  @ApiProperty()
  @Column()
  userId: number

  public static getTestData(user?: User, data?: ITaskTestData) {
    return R.merge(
      {
        title: faker.lorem.word(),
        description: faker.lorem.paragraph(),
        status: faker.random.arrayElement(Object.values(TaskStatus)),
        user,
        userId: user?.id || undefined,
      },
      data
    )
  }

  @BeforeInsert()
  beforeInsertTask() {
    this.status = this.status ?? TaskStatus.OPEN
  }
}
