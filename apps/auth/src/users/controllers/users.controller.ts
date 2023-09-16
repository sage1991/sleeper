import { Body, Controller, Post } from "@nestjs/common"

import { CreateUserDto } from "../dto"
import { UsersService } from "../services"

@Controller("users")
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.service.create(dto)
  }
}
