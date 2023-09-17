import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import cookieParser from "cookie-parser"

import { ReservationsModule } from "./reservations.module"

const bootstrap = async () => {
  const app = await NestFactory.create(ReservationsModule)

  app.use(cookieParser())

  const config = app.get(ConfigService)
  await app.listen(config.get<number>("http_port"))
}

void bootstrap()
