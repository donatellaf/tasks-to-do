/* eslint-disable max-lines-per-function */
import { TestingModule } from '@nestjs/testing'
import { AuthTestingEntityService } from 'src/modules/auth/testing-entity.service'
import { CreateTaskDTO, GetFilterDTO } from 'src/modules/tasks/task/task.dto'
import { TaskStatus } from 'src/modules/tasks/task/task.types'
import { TasksModule } from 'src/modules/tasks/tasks.module'
import { TasksService } from 'src/modules/tasks/tasks.service'
import { TasksTestingEntityService } from 'src/modules/tasks/testing-entity.service'
import { bootstrap } from 'src/modules/testing/main'
import { TestingDatabaseService } from 'src/modules/testing/testing-database.service'

describe('[service] TaskService', () => {
  let tasksService: TasksService
  let databaseService: TestingDatabaseService
  let authEntity: AuthTestingEntityService
  let taskEntity: TasksTestingEntityService

  beforeAll(async () => {
    const app: TestingModule = await bootstrap({
      imports: [TasksModule],
      providers: [AuthTestingEntityService, TasksTestingEntityService],
    })

    tasksService = app.get<TasksService>(TasksService)
    databaseService = app.get<TestingDatabaseService>(TestingDatabaseService)

    authEntity = app.get<AuthTestingEntityService>(AuthTestingEntityService)
    taskEntity = app.get<TasksTestingEntityService>(TasksTestingEntityService)
  })

  afterEach(async () => {
    await databaseService.clearDb()
  })

  describe('getTasks', () => {
    it('should return user 2 tasks', async () => {
      const user = await authEntity.createUser()
      const expectedTasks = await taskEntity.createTasks(2, user)

      const tasks = await tasksService.getTasks({} as GetFilterDTO, user)

      expect(tasks).toStrictEqual(expectedTasks)
    })

    describe('when filter status property', () => {
      it('should return relevant tasks', async () => {
        const expectedStatus = TaskStatus.DONE

        const user = await authEntity.createUser()
        await taskEntity.createTask(user, { status: TaskStatus.OPEN })
        const task1relevant = await taskEntity.createTask(user, {
          status: expectedStatus,
        })
        const task2relevant = await taskEntity.createTask(user, {
          status: expectedStatus,
        })

        const tasks = await tasksService.getTasks(
          { status: expectedStatus } as GetFilterDTO,
          user
        )

        expect(tasks).toStrictEqual([task1relevant, task2relevant])
      })
    })

    describe('when search status property', () => {
      it('should return relevant tasks', async () => {
        const expectedTitle = 'hello'

        const user = await authEntity.createUser()
        await taskEntity.createTask(user, { title: 'some title' })
        const task1relevant = await taskEntity.createTask(user, {
          title: `left ${expectedTitle}`,
        })
        const task2relevant = await taskEntity.createTask(user, {
          title: `${expectedTitle} right`,
        })
        const task3relevant = await taskEntity.createTask(user, {
          description: expectedTitle,
        })

        const tasks = await tasksService.getTasks(
          { search: expectedTitle } as GetFilterDTO,
          user
        )

        expect(tasks).toStrictEqual([
          task1relevant,
          task2relevant,
          task3relevant,
        ])
      })
    })
  })

  describe('createTask', () => {
    it('should create new task', async () => {
      const user = await authEntity.createUser()

      const createDTO: CreateTaskDTO = {
        title: 'some title',
        description: 'some description',
      }

      const task = await tasksService.createTask(createDTO, user)
      const tasks = await taskEntity.listTasks()

      expect(task).toMatchObject({
        title: createDTO.title,
        description: createDTO.description,
        status: TaskStatus.OPEN,
      })
      expect(tasks).toHaveLength(1)
    })
  })

  describe('deleteTask', () => {
    it('should delete task', async () => {
      const user = await authEntity.createUser()
      const task = await taskEntity.createTask(user)

      await tasksService.deleteTask(task.id, user)

      const tasks = await taskEntity.listTasks()

      expect(tasks).toHaveLength(0)
    })

    describe('when deleting other peoples tasks', () => {
      it('should not delete task', async () => {
        const user = await authEntity.createUser()
        const task = await taskEntity.createTask(user)
        const otherUser = await authEntity.createUser()

        const deleteTask = tasksService.deleteTask(task.id, otherUser)

        await expect(deleteTask).rejects.toBeTruthy()
      })
    })
  })

  describe('updateTaskStatus', () => {
    it('should update task status', async () => {
      const expectedStatus = TaskStatus.DONE
      const user = await authEntity.createUser()
      const task = await taskEntity.createTask(user, {
        status: TaskStatus.OPEN,
      })

      const updatedTask = await tasksService.updateTaskStatus(
        task.id,
        expectedStatus,
        user
      )
      const tasks = await taskEntity.listTasks()

      expect(tasks[0].status).toStrictEqual(expectedStatus)
      expect(updatedTask.status).toStrictEqual(expectedStatus)
    })

    describe('when updating other peoples tasks', () => {
      it('should not update task status', async () => {
        const expectedStatus = TaskStatus.DONE
        const user = await authEntity.createUser()
        const task = await taskEntity.createTask(user, {
          status: TaskStatus.OPEN,
        })
        const otherUser = await authEntity.createUser()

        const updateTask = tasksService.updateTaskStatus(
          task.id,
          expectedStatus,
          otherUser
        )
        await expect(updateTask).rejects.toBeTruthy()
      })
    })
  })
})
