import { AbstractRepository } from "@app/common"
import { Injectable, Logger } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"

import { Reservation } from "../schemas"

@Injectable()
export class ReservationsRepository extends AbstractRepository<Reservation> {
  protected readonly logger = new Logger(ReservationsRepository.name)

  constructor(@InjectModel(Reservation.name) model: Model<Reservation>) {
    super(model)
  }
}
