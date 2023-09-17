import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { Transport } from "@nestjs/microservices"
import cookieParser from "cookie-parser"

import { AppModule } from "./app.module"

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const config = app.get(ConfigService)

  app.use(cookieParser())
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: config.get<number>("tcp_port")
    }
  })

  await app.startAllMicroservices()
  await app.listen(config.get<number>("http_port"))
}

void bootstrap()
