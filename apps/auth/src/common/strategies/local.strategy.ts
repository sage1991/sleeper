import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"

import { UsersService } from "../../users/services"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly service: UsersService) {
    super({
      usernameField: "email",
      passwordField: "password"
    })
  }

  validate(email: string, password: string) {
    try {
      return this.service.validate(email, password)
    } catch (e) {
      throw new UnauthorizedException(e)
    }
  }
}
