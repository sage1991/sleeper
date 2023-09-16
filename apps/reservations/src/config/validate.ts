import { plainToInstance, Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString, validateSync } from "class-validator"

class EnvironmentVariables {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  port: number

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
