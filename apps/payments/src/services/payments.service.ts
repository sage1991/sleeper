import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Stripe from "stripe"

import { CreateChargeDto } from "./dto"

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get<string>("stripe_api_key"), {
    apiVersion: "2023-08-16"
  })

  constructor(private readonly config: ConfigService) {}

  async createCharge({ amount, card }: CreateChargeDto) {
    const methods = await this.stripe.paymentMethods.create({
      type: "card",
      card
    })
    return this.stripe.paymentIntents.create({
      payment_method: methods.id,
      currency: "USD",
      amount: amount * 100,
      confirm: true,
      payment_method_types: ["card"]
    })
  }
}
