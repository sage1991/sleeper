import { Type } from "class-transformer"
import { IsDate, IsNotEmpty, IsString } from "class-validator"

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
}
