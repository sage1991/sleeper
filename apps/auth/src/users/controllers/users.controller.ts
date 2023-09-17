import { CurrentUser, UserDto } from "@app/common"
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common"

import { JwtAuthGuard } from "../../common/guards"
import { CreateUserDto } from "../dto"
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
  async getUser(@CurrentUser() user: UserDto) {
    return user
  }
}
