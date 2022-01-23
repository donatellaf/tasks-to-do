import { EntityRepository, Repository } from 'typeorm'
import { User } from 'src/modules/auth/user/user.entity'
import { CreateTaskDTO, GetFilterDTO } from 'src/modules/tasks/task/task.dto'
import { Task } from 'src/modules/tasks/task/task.entity'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDTO: GetFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDTO
    const query = this.createQueryBuilder('task')

    query.orderBy('id')

    query.where('task.userId = :userId', { userId: user.id })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` }
      )
    }
    const tasks = await query.getMany()

    return tasks
  }

  async createTask(createDTO: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description, status } = createDTO

    const task = new Task()
    task.title = title
    task.description = description
    task.user = user
    task.status = status

    await task.save()

    return task
  }
}
