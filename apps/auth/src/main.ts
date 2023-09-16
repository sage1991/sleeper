import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import cookieParser from "cookie-parser"

import { AppModule } from "./app.module"

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  const config = app.get(ConfigService)
  await app.listen(config.get<number>("port"))
}

void bootstrap()
