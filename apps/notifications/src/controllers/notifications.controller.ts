import { NotifyEmailDto } from "@app/common"
import { Controller, UsePipes, ValidationPipe } from "@nestjs/common"
import { EventPattern, Payload } from "@nestjs/microservices"

import { NotificationsService } from "../services"

@Controller()
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @EventPattern("notify-email")
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async notifyEmail(@Payload() dto: NotifyEmailDto) {
    await this.service.notifyEmail(dto)
  }
}
