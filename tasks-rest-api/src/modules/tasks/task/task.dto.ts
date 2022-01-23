import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'
import { TaskStatus } from 'src/modules/tasks/task/task.types'

export class GetFilterDTO {
  @ApiProperty({
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: TaskStatus

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsNotEmpty()
  search: string
}

export class CreateTaskDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiProperty()
  @IsNotEmpty()
  description: string

  @ApiProperty()
  @IsOptional()
  status: TaskStatus
}
