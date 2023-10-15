import { Services, UserDto } from "@app/common"
import { Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { map } from "rxjs"
import Stripe from "stripe"

import { CreateReservationDto, UpdateReservationDto } from "../dto"
import { ReservationsRepository } from "../repositories"

@Injectable()
export class ReservationsService {
  constructor(
    private readonly repository: ReservationsRepository,
    @Inject(Services.payments) private readonly payments: ClientProxy
  ) {}

  async create({ _id, email }: UserDto, dto: CreateReservationDto) {
    return this.payments.send<Stripe.PaymentIntent>("create-charge", { ...dto.charge, email }).pipe(
      map(({ id }) => {
        return this.repository.create({ ...dto, invoice: id, user: _id })
      })
    )
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
