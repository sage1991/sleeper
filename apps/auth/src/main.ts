import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"

import { AppModule } from "./app.module"

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)
  await app.listen(config.get<number>("port"))
}

void bootstrap()
