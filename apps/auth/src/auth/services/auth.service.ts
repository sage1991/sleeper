import { UserDto } from "@app/common"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import dayjs from "dayjs"
import { Response } from "express"

import { TokenPayload } from "../../common/interfaces"

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  login(user: UserDto, response: Response) {
    const payload: TokenPayload = {
      id: user._id
    }
    const token = this.jwtService.sign(payload)
    response.cookie("Authentication", token, {
      httpOnly: true,
      expires: dayjs().add(this.config.get<number>("jwt_expiration"), "seconds").toDate()
    })
  }
}
