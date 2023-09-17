import { CurrentUser, UserDto } from "@app/common"
import { Controller, Post, Res, UseGuards } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"
import { Response } from "express"

import { JwtAuthGuard, LocalAuthGuard } from "../../common/guards"
import { AuthService } from "../services"

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@CurrentUser() user: UserDto, @Res({ passthrough: true }) response: Response) {
    this.service.login(user, response)
    return user
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern("authenticate")
  async authenticate(@Payload() data: any) {
    return data.user
  }
}
