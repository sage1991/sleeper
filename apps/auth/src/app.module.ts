import { DatabaseModule } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"

import { AuthModule } from "./auth"
import { validate } from "./common/config"
import { LocalStrategy } from "./common/strategies"
import { UsersModule } from "./users"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate
    }),
    DatabaseModule,
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: config.get<string>("jwt_secret"),
          signOptions: {
            expiresIn: config.get<string>("jwt_expiration")
          }
        }
      }
    }),
    AuthModule,
    UsersModule
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    },
    LocalStrategy
  ]
})
export class AppModule {}
