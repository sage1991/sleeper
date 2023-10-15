import { validate } from "@app/common"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"

import { EnvironmentVariables } from "./common/config"
import { NotificationsController } from "./controllers"
import { NotificationsService } from "./services"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate(EnvironmentVariables)
    })
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService]
})
export class NotificationsModule {}
