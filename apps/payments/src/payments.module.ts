import { AuthorizationGuard, Services, validate } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_GUARD, APP_PIPE } from "@nestjs/core"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { EnvironmentVariables } from "./common/config"
import { PaymentsController } from "./controllers"
import { PaymentsService } from "./services"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate(EnvironmentVariables)
    }),
    ClientsModule.registerAsync([
      {
        name: Services.auth,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("auth_service_host"),
            port: config.get<number>("auth_service_port")
          }
        })
      },
      {
        name: Services.notifications,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("notifications_service_host"),
            port: config.get<number>("notifications_service_port")
          }
        })
      }
    ])
  ],
  controllers: [PaymentsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard
    },
    PaymentsService
  ]
})
export class PaymentsModule {}
