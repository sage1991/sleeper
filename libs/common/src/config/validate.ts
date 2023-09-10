import { plainToInstance } from "class-transformer"
import { IsNotEmpty, IsString, validateSync } from "class-validator"

class EnvironmentVariables {
  @IsString()
  @IsNotEmpty()
  mongo_db_uri: string

  @IsString()
  @IsNotEmpty()
  mongo_db_user: string

  @IsString()
  @IsNotEmpty()
  mongo_db_password: string
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
