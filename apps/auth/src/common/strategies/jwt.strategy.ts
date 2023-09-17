import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
import { Request } from "express"
import { ExtractJwt, Strategy } from "passport-jwt"

import { UsersService } from "../../users/services"
import { TokenPayload } from "../interfaces"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      secretOrKey: config.get<string>("jwt_secret"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.["Authentication"] ?? request?.["Authentication"]
      ])
    })
  }

  validate({ id: _id }: TokenPayload) {
    return this.usersService.findUser({ _id })
  }
}
