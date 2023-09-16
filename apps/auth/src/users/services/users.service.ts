import { Injectable, UnauthorizedException } from "@nestjs/common"
import { compare, hash } from "bcryptjs"

import { CreateUserDto } from "../dto"
import { UsersRepository } from "../repositories"

const SALT_ROUNDS = 10

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create({ password, ...rest }: CreateUserDto) {
    return this.repository.create({
      ...rest,
      password: await hash(password, SALT_ROUNDS)
    })
  }

  async validate(email: string, password: string) {
    const user = await this.repository.findOne({ email })
    const isPasswordValid = await compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException("Credentials are not valid")
    }
    return user
  }
}
