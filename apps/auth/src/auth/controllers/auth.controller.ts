import { Controller, Post, Res, UseGuards } from "@nestjs/common"
import { Response } from "express"

import { CurrentUser } from "../../common/decorators"
import { LocalAuthGuard } from "../../common/guards"
import { User } from "../../users/schemas"
import { AuthService } from "../services"

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@CurrentUser() user: User, @Res({ passthrough: true }) response: Response) {
    this.service.login(user, response)
    return user
  }
}
