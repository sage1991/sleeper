import { DatabaseModule, validate } from "@app/common"
import { Module, ValidationPipe } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_PIPE } from "@nestjs/core"
import { JwtModule } from "@nestjs/jwt"

import { AuthModule } from "./auth"
import { EnvironmentVariables } from "./common/config"
import { JwtStrategy, LocalStrategy } from "./common/strategies"
import { UsersModule } from "./users"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validate(EnvironmentVariables)
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
    LocalStrategy,
    JwtStrategy
  ]
})
export class AppModule {}
