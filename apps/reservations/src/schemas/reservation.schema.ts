import { AbstractDocument } from "@app/common"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class Reservation extends AbstractDocument {
  @Prop()
  startAt: Date

  @Prop()
  endAt: Date

  @Prop()
  user: string

  @Prop()
  place: string

  @Prop()
  invoice: string

  @Prop({ default: Date })
  createdAt: Date
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)
