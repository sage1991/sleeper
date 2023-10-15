import { CreateChargeDto } from "@app/common"
import { Type } from "class-transformer"
import { IsDate, IsDefined, IsNotEmptyObject, ValidateNested } from "class-validator"

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startAt: Date

  @IsDate()
  @Type(() => Date)
  endAt: Date

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateChargeDto)
  charge: CreateChargeDto
}
