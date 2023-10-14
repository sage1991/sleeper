import { validate } from "@app/common"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { EnvironmentVariables } from "./common/config"
import { PaymentsController } from "./controllers"
import { PaymentsService } from "./services"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate(EnvironmentVariables)
    })
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
