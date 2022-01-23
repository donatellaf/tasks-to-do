import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/modules/auth/auth.module'
import { TaskRepository } from 'src/modules/tasks/task/task.repository'
import { TasksController } from 'src/modules/tasks/tasks.controller'
import { TasksService } from 'src/modules/tasks/tasks.service'

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TaskRepository])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
