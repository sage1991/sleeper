import { Test, TestingModule } from "@nestjs/testing"

import { NotificationsService } from "../services"
import { NotificationsController } from "./notifications.controller"

describe("NotificationsController", () => {
  let controller: NotificationsController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService]
    }).compile()

    controller = app.get<NotificationsController>(NotificationsController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
