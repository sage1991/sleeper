import { UserDto } from "@app/common"
import { Injectable } from "@nestjs/common"

import { CreateReservationDto, UpdateReservationDto } from "../dto"
import { ReservationsRepository } from "../repositories"

@Injectable()
export class ReservationsService {
  constructor(private readonly repository: ReservationsRepository) {}

  create({ _id }: UserDto, dto: CreateReservationDto) {
    return this.repository.create({ ...dto, user: _id })
  }

  removeAll() {
    return this.repository.remove({})
  }

  findAll() {
    return this.repository.find({})
  }

  findOne(id: string) {
    return this.repository.findOne({ _id: id })
  }

  update(id: string, dto: UpdateReservationDto) {
    return this.repository.findOneAndUpdate({ _id: id }, { $set: dto })
  }

  remove(id: string) {
    return this.repository.findOneAndDelete({ _id: id })
  }
}
