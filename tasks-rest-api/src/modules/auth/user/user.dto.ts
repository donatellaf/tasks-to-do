import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator'

export class CredentialsDTO {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/u, {
    message: 'password too weak',
  })
  password: string
}

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  salt: string

  @ApiProperty()
  @IsNotEmpty()
  password: string
}
