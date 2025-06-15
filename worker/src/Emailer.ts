import * as brevo from '@getbrevo/brevo';

export default class Emailer {
  private client: brevo.TransactionalEmailsApi;
  private fromAddress: string;
  private fromName: string;

  constructor(apiKey: string, fromAddress: string, fromName: string) {
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
    this.client = client;
    this.fromAddress = fromAddress;
    this.fromName = fromName;
  }

  public async sendEmail(toAddress: string, toName: string) {
    const email = new brevo.SendSmtpEmail();
    email.subject = "Test Email";
    email.htmlContent = this.getEmailContent();
    email.sender = { email: this.fromAddress, name: this.fromName };
    email.to = [{ email: toAddress, name: toName }];
    email.replyTo = { email: toAddress, name: toName }; 

    try {
      const data = await this.client.sendTransacEmail(email);
      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      return error;
    }
  }

  private getEmailContent(): string {
    return "<html><body><h1>Transactional Email Test</h1></body></html>"
  }
}