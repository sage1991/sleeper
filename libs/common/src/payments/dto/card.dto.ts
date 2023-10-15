import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CardDto {
  @IsString()
  @IsNotEmpty()
  cvc: string

  @IsNumber()
  year: number

  @IsNumber()
  month: number

  @IsCreditCard()
  number: string
}
