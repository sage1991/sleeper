import { CreateChargeDto } from "@app/common"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import Stripe from "stripe"

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.config.get<string>("stripe_api_key"), {
    apiVersion: "2023-08-16"
  })

  constructor(private readonly config: ConfigService) {}

  async createCharge({ amount }: CreateChargeDto) {
    const methods = await this.stripe.paymentMethods.create({
      type: "card",
      card: {
        token: "tok_visa" // test card token
      }
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
