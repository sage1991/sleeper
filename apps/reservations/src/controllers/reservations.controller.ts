import { CurrentUser, JwtAuthGuard, UserDto } from "@app/common"
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"

import { CreateReservationDto, UpdateReservationDto } from "../dto"
import { ReservationsService } from "../services"

@Controller("reservations")
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.reservationsService.findAll()
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@CurrentUser() user: UserDto, @Body() dto: CreateReservationDto) {
    return this.reservationsService.create(user, dto)
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  removeAll() {
    return this.reservationsService.removeAll()
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  findOne(@Param("id") id: string) {
    return this.reservationsService.findOne(id)
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(@Param("id") id: string, @Body() dto: UpdateReservationDto) {
    return this.reservationsService.update(id, dto)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.reservationsService.remove(id)
  }
}
