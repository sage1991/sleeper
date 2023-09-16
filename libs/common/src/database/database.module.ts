import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.get("mongo_db_uri"),
          user: config.get("mongo_db_user"),
          pass: config.get("mongo_db_password"),
          dbName: config.get("mongo_db_name")
        }
      }
    })
  ]
})
export class DatabaseModule {
  static forFeature = (...params: Parameters<typeof MongooseModule.forFeature>) => {
    return MongooseModule.forFeature(...params)
  }
}
