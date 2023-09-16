import { AbstractDocument } from "@app/common"
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class User extends AbstractDocument {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
