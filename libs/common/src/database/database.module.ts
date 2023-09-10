import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

import { ConfigModule } from "../config"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get("mongo_db_uri"),
          user: config.get("mongo_db_user"),
          pass: config.get("mongo_db_password")
        }
      }
    })
  ]
})
export class DatabaseModule {}
