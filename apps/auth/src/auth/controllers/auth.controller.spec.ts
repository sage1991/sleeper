import { Test, TestingModule } from "@nestjs/testing"

import { AuthService } from "../services"
import { AuthController } from "./auth.controller"

describe("AuthController", () => {
  let controller: AuthController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile()

    controller = app.get<AuthController>(AuthController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
