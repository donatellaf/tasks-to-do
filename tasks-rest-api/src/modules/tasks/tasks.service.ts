import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/modules/auth/user/user.entity'
import { CreateTaskDTO, GetFilterDTO } from 'src/modules/tasks/task/task.dto'
import { Task } from 'src/modules/tasks/task/task.entity'
import { TaskRepository } from 'src/modules/tasks/task/task.repository'
import { TaskStatus } from 'src/modules/tasks/task/task.types'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository
  ) {}

  getTasks(filterDTO: GetFilterDTO, user: User): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDTO, user)
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    })

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`)
    }

    return task
  }

  createTask(createDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.taskRepository.createTask(createDTO, user)
  }

  async deleteTask(id: number, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user)

    const deleteResult = await this.taskRepository.delete({
      id,
      userId: user.id,
    })

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found.`)
    }

    return task
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user)

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`)
    }

    const updateResult = await this.taskRepository.update(
      { id, userId: user.id },
      { status }
    )

    if (updateResult.affected === 0) {
      throw new UnauthorizedException()
    }

    return this.getTaskById(id, user)
  }

  async updateDescriptionTask(
    id: number,
    description: string,
    user: User
  ): Promise<Task> {
    const task = await this.getTaskById(id, user)

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found.`)
    }

    const updateResult = await this.taskRepository.update(
      { id, userId: user.id },
      { description }
    )

    if (updateResult.affected === 0) {
      throw new UnauthorizedException()
    }

    return this.getTaskById(id, user)
  }
}
