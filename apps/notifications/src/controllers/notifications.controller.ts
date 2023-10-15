import { Controller } from "@nestjs/common"

import { NotificationsService } from "../services"

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}
}
