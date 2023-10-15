import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EnvironmentVariables {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  http_port: number

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
  auth_service_host: string

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  auth_service_port: number

  @IsString()
  @IsNotEmpty()
  payments_service_host: string

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  payments_service_port: number
}
