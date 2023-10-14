import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { MicroserviceOptions, Transport } from "@nestjs/microservices"

import { PaymentsModule } from "./payments.module"

const bootstrap = async () => {
  const app = await NestFactory.create(PaymentsModule)
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

void bootstrap()
