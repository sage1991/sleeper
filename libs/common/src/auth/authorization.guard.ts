import { Services } from "@app/common/const"
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { Request } from "express"
import { map, tap } from "rxjs"

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(@Inject(Services.auth) private readonly proxy: ClientProxy) {}

  canActivate(context: ExecutionContext) {
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
