import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"

import { ReservationsModule } from "./reservations.module"

const bootstrap = async () => {
  const app = await NestFactory.create(ReservationsModule)
  const config = app.get(ConfigService)
  await app.listen(config.get<number>("port"))
}
void bootstrap()
