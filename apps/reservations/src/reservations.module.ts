import { AuthorizationGuard, DatabaseModule, Services, validate } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_GUARD, APP_PIPE } from "@nestjs/core"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { EnvironmentVariables } from "./config"
import { ReservationsController } from "./controllers"
import { ReservationsRepository } from "./repositories"
import { Reservation, ReservationSchema } from "./schemas"
import { ReservationsService } from "./services"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate(EnvironmentVariables)
    }),
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
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
        name: Services.payments,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("payments_service_host"),
            port: config.get<number>("payments_service_port")
          }
        })
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    {
      provide: APP_GUARD,
      useClass: AuthorizationGuard
    },
    ReservationsService,
    ReservationsRepository
  ]
})
export class ReservationsModule {}
