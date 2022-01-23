import { PipeTransform, BadRequestException } from '@nestjs/common'
import { TaskStatus } from 'src/modules/tasks/task/task.types'

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: any) {
    const valueUC = value.toUpperCase()

    if (!this.isStatusValid(valueUC)) {
      throw new BadRequestException(`"${valueUC}" is an invalid status`)
    }

    return valueUC
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status)
    return index !== -1
  }
}
