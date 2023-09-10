import { Module } from "@nestjs/common"
import { ConfigModule as NestConfigModule, ConfigService } from "@nestjs/config"

import { validate } from "./validate"

@Module({
  imports: [
    NestConfigModule.forRoot({
      validate
    })
  ],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
