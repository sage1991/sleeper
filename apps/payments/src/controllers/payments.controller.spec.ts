import { Test, TestingModule } from "@nestjs/testing"

import { PaymentsService } from "../services"
import { PaymentsController } from "./payments.controller"

describe("PaymentsController", () => {
  let controller: PaymentsController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      providers: [PaymentsService]
    }).compile()

    controller = app.get<PaymentsController>(PaymentsController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
