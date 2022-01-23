import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EnvService {
  constructor(private readonly configService: ConfigService) {}

  public getNumber(key: string) {
    return this.get<number>(key)
  }

  public getString(key: string) {
    return this.get<string>(key)
  }

  private get<TType>(key: string): TType {
    const value = this.configService.get<TType>(key)

    if (typeof value === 'undefined') {
      throw new Error(`Environment value ${key} must be set.`)
    }

    return value
  }
}
