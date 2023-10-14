import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException
} from "@nestjs/common"
import { compare, hash } from "bcryptjs"

import { FindUserDto } from "../../auth/dto"
import { CreateUserDto } from "../dto"
import { UsersRepository } from "../repositories"

const SALT_ROUNDS = 10

@Injectable()
export class UsersService {
  constructor(private readonly repository: UsersRepository) {}

  async create({ email, password }: CreateUserDto) {
    await this.validateCreateUserDto({ email, password })
    return this.repository.create({
      email,
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

  findUser(dto: FindUserDto) {
    return this.repository.findOne(dto)
  }

  private async validateCreateUserDto({ email }: CreateUserDto) {
    try {
      await this.repository.findOne({ email })
    } catch (e) {
      if (e instanceof NotFoundException) {
        return
      }
      throw e
    }
    throw new UnprocessableEntityException("user already exist for given email")
  }
}
