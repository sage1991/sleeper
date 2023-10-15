import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class EnvironmentVariables {
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
  auth_service_host: string

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  auth_service_port: string

  @IsString()
  @IsNotEmpty()
  smtp_user: string

  @IsString()
  @IsNotEmpty()
  google_oauth_client_id: string

  @IsString()
  @IsNotEmpty()
  google_oauth_client_secret: string

  @IsString()
  @IsNotEmpty()
  google_oauth_refresh_token: string
}
