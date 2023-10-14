import { Controller } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

import { CreateChargeDto } from "../dto"
import { PaymentsService } from "../services"

@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  @MessagePattern("create-charge")
  async createCharge(@Payload() dto: CreateChargeDto) {
    return this.service.createCharge(dto)
  }
}
