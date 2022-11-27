import nodeMailer from "nodemailer";

import { config } from "../config/config";

export class EmailService {
  private transporter: any;

  constructor() {
    this.transporter = nodeMailer.createTransport({
      host: config?.email?.smtp?.host,
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: config?.email?.smtp?.auth?.user,
        pass: config?.email?.smtp?.auth?.pass,
      },
    });
  }

  private sendEmail = async (
    to: string,
    subject: string,
    html: string
  ): Promise<any> => {
    const mailOptions = {
      from: config?.email?.from,
      to,
      subject,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  };

  async sendResetPasswordEmail(to: string, token: string): Promise<any> {
    const subject = "Reset Password";
    const html = `Please use the following link to reset your password: <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>`;

    await this.sendEmail(to, subject, html);
  }
}
