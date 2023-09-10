import { NestFactory } from "@nestjs/core"

import { ReservationsModule } from "./reservations.module"

const bootstrap = async () => {
  const app = await NestFactory.create(ReservationsModule)
  await app.listen(3000)
}
void bootstrap()
