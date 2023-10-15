import { NotifyEmailDto } from "@app/common"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import nodemailer from "nodemailer"

@Injectable()
export class NotificationsService {
  private readonly transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: this.config.get<string>("smtp_user"),
      clientId: this.config.get<string>("google_oauth_client_id"),
      clientSecret: this.config.get<string>("google_oauth_client_secret"),
      refreshToken: this.config.get<string>("google_oauth_refresh_token")
    }
  })

  constructor(private readonly config: ConfigService) {}

  async notifyEmail({ email, subject, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.config.get<string>("smtp_user"),
      to: email,
      subject,
      text
    })
  }
}
