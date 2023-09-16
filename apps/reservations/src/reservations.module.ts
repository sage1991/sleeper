import { DatabaseModule } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"

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
    DatabaseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }])
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
