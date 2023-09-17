import { DatabaseModule, Services } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { ClientsModule, Transport } from "@nestjs/microservices"

import { validate } from "./config"
import { ReservationsController } from "./controllers"
import { ReservationsRepository } from "./repositories"
import { Reservation, ReservationSchema } from "./schemas"
import { ReservationsService } from "./services"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
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
      }
    ])
  ],
  controllers: [ReservationsController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    ReservationsService,
    ReservationsRepository
  ]
})
export class ReservationsModule {}
