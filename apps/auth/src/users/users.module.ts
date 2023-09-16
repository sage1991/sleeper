import { DatabaseModule } from "@app/common"
import { Module } from "@nestjs/common"

import { UsersController } from "./controllers"
import { UsersRepository } from "./repositories"
import { User, UserSchema } from "./schemas"
import { UsersService } from "./services"

@Module({
  imports: [DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService]
})
export class UsersModule {}
