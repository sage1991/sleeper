import { CurrentUser, UserDto } from "@app/common"
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common"

import { CreateReservationDto, UpdateReservationDto } from "../dto"
import { ReservationsService } from "../services"

@Controller("reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll() {
    return this.reservationsService.findAll()
  }

  @Post()
  create(@CurrentUser() user: UserDto, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(user, dto)
  }

  @Delete()
  removeAll() {
    return this.reservationsService.removeAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.reservationsService.findOne(id)
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto)
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.reservationsService.remove(id)
  }
}
