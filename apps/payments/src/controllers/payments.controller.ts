import { Controller, UsePipes, ValidationPipe } from "@nestjs/common"
import { MessagePattern, Payload } from "@nestjs/microservices"

import { PaymentsCreateChargeDto } from "../dto"
import { PaymentsService } from "../services"

@Controller()
export class PaymentsController {
  constructor(private readonly service: PaymentsService) {}

  // In the case of hybrid apps, the useGlobalPipes() method doesn't set up pipes for gateways and microservices.
  @MessagePattern("create-charge")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCharge(@Payload() dto: PaymentsCreateChargeDto) {
    return this.service.createCharge(dto)
  }
}
