import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"

import { NotificationsModule } from "./notifications.module"

const bootstrap = async () => {
  const app = await NestFactory.create(NotificationsModule)
  const config = app.get(ConfigService)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: "0.0.0.0",
      port: config.get<number>("tcp_port")
    }
  })

  await app.startAllMicroservices()
  await app.listen(config.get<number>("http_port"))
}

bootstrap()
