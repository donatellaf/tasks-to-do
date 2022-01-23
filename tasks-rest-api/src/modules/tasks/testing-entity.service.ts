/* eslint-disable no-await-in-loop */
import { Injectable } from '@nestjs/common'
import { User } from 'src/modules/auth/user/user.entity'
import { Task } from 'src/modules/tasks/task/task.entity'
import { ITaskTestData } from 'src/modules/tasks/task/task.types'
import { TestingEntityService } from 'src/modules/testing/testing-entity.service'

export type IConstructorOf<TEntity> = new () => TEntity

@Injectable()
export class TasksTestingEntityService extends TestingEntityService {
  public createTask(user?: User, data?: ITaskTestData) {
    return this.create(Task, Task.getTestData(user, data))
  }

  public async createTasks(count: number, user?: User) {
    const tasks = []

    for (const _ of Array(count)) {
      const task = await this.create(Task, Task.getTestData(user))
      tasks.push(task)
    }

    return tasks
  }

  public listTasks() {
    return this.list<Task>('task')
  }
}
