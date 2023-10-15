import { Services } from "@app/common"
import { Inject, Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ClientProxy } from "@nestjs/microservices"
import Stripe from "stripe"

import { PaymentsCreateChargeDto } from "../dto"

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get<string>("stripe_api_key"), {
    apiVersion: "2023-08-16"
  })

  constructor(
    private readonly config: ConfigService,
    @Inject(Services.notifications) private readonly notifications: ClientProxy
  ) {}

  async createCharge({ amount, email }: PaymentsCreateChargeDto) {
    const methods = await this.stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "tok_visa" // test card token
      }
    })
    const intents = await this.stripe.paymentIntents.create({
      payment_method: methods.id,
      currency: "USD",
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"]
    })
    this.notifications.emit("notify-email", { email })
    return intents
  }
}
