import { ClassConstructor, plainToInstance } from "class-transformer"
import { validateSync } from "class-validator"

export const validate = (cls: ClassConstructor<any>) => (config: Record<string, unknown>) => {
  const variables = plainToInstance(cls, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(variables, { skipMissingProperties: false })
  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return variables
}
