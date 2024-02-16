import nodemailer from "nodemailer";
import {
  registerOrChangeMessage,
  resetPasswordMessage,
} from "../utils/emailMsg";

interface EmailMessage {
  getMessage(
    userId: string,
    idCompany: string,
    service: string,
    typeAction: string,
  ): string;
}

class RegisterOrChangeMessage implements EmailMessage {
  getMessage(
    userId: string,
    idCompany: string,
    service: string,
    typeAction: string
  ): string {
    return registerOrChangeMessage(userId, idCompany, service, typeAction);
  }
}

class ResetPasswordMessage implements EmailMessage {
  getMessage(userId: string, service: string): string {
    return resetPasswordMessage(userId, service);
  }
}

class EmailService {
  static createTransportConfig() {
    return nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
      },
    });
  }

  static async sendEmailToRegisterOrChangePassword(
    recipient: string,
    service: string,
    userId: string,
    typeAction: string,
    idCompany: string
  ): Promise<void> {
    const transportConfig = this.createTransportConfig();

    const message = new RegisterOrChangeMessage();

    await transportConfig
      .sendMail({
        from: `Aunteticador ${service} <${process.env.USER_EMAIL}>`,
        to: recipient,
        subject: "Cadastro de usuário",
        html: message.getMessage(userId, idCompany, service, typeAction),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
  }

  static async sendEmailToResetPassword(
    recipient: string,
    service: string,
    userId: string
  ): Promise<void> {
    const transportConfig = this.createTransportConfig();

    const message = new ResetPasswordMessage();

    await transportConfig
      .sendMail({
        from: `Aunteticador ${service} <${process.env.USER_EMAIL}>`,
        to: recipient,
        subject: "Cadastrar nova senha",
        html: message.getMessage(userId, service),
      })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw error;
      });
  }
}

export default EmailService;
