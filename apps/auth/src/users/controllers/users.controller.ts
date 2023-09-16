import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"

import { CurrentUser } from "../../common/decorators"
import { JwtAuthGuard } from "../../common/guards"
import { CreateUserDto } from "../dto"
import { User } from "../schemas"
import { UsersService } from "../services"

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: User) {
    return user
  }
}
