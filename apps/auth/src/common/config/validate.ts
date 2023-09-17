import { plainToInstance, Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator"

class EnvironmentVariables {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  http_port: number

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  tcp_port: number

  @IsString()
  @IsNotEmpty()
  mongo_db_uri: string

  @IsString()
  @IsNotEmpty()
  mongo_db_user: string

  @IsString()
  @IsNotEmpty()
  mongo_db_password: string

  @IsString()
  @IsNotEmpty()
  mongo_db_name: string

  @IsString()
  @IsNotEmpty()
  jwt_secret: string

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  jwt_expiration: number
}

export const validate = (config: Record<string, unknown>) => {
  const variables = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(variables, { skipMissingProperties: false })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return variables
}
