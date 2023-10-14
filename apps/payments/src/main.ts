import { NestFactory } from "@nestjs/core"

import { PaymentsModule } from "./payments.module"

const bootstrap = async () => {
  const app = await NestFactory.create(PaymentsModule)
  await app.listen(3000)
}

void bootstrap()
