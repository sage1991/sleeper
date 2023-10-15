import { CreateChargeDto } from "@app/common"
import { Type } from "class-transformer"
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested
} from "class-validator"

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startAt: Date

  @IsDate()
  @Type(() => Date)
  endAt: Date

  @IsString()
  @IsNotEmpty()
  place: string

  @IsString()
  @IsNotEmpty()
  invoice: string

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto
}
