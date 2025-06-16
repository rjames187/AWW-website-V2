export default class EmailService {
  private fromAddress: string;
  private fromName: string;
  private headers: any;
  private URL: string = "https://api.brevo.com/v3/smtp/email";

  constructor(apiKey: string, fromAddress: string, fromName: string) {
    this.headers = new Headers();
    this.headers.append('api-key', `${apiKey}`);
    this.headers.append('Content-Type', 'application/json');
    this.fromAddress = fromAddress;
    this.fromName = fromName;
  }

  public async sendEmail(toAddress: string, toName: string) {
    const options = {
      method: 'POST',
      headers: this.headers,
      body: this.getBody(toAddress, toName),
    }

    return await fetch(this.URL, options);
  }

  private getBody(toAddress: string, toName: string) {
    const body = {
      sender: {
        name: this.fromName,
        email: this.fromAddress,
      },
      to: [
        {
          name: toName,
          email: toAddress,
        },
      ],
      subject: "Test Email",
      htmlContent: this.getEmailContent(),
    };
    return JSON.stringify(body);
  }

  private getEmailContent(): string {
    return "<html><body><h1>Transactional Email Test</h1></body></html>"
  }
}