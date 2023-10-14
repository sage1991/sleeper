import { Public } from "@app/common/auth"
import { Services } from "@app/common/const"
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { ClientProxy } from "@nestjs/microservices"
import { Request } from "express"
import { map, tap } from "rxjs"

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    @Inject(Services.auth) private readonly proxy: ClientProxy,
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(Public, [
      context.getHandler(),
      context.getClass()
    ])
    if (isPublic) {
      return true
    }

    const request: Request = context.switchToHttp().getRequest()
    const jwt = request.cookies?.["Authentication"]
    if (!jwt) {
      return false
    }
    return this.proxy.send("authenticate", { Authentication: jwt }).pipe(
      tap((user) => {
        request.user = user
      }),
      map((user) => !!user)
    )
  }
}
