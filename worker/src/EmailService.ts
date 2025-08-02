import { contactSubmissionTemplate, errorReportTemplate } from "./templates";

export default class EmailService {
  public static instance: EmailService;
  private fromAddress: string;
  private fromName: string;
  private adminAddress: string;
  private ownerAddress: string;
  private headers: any;
  private URL: string = "https://api.brevo.com/v3/smtp/email";
  private notifyBoth: boolean;

  public static startService(apiKey: string, fromAddress: string, fromName: string, adminAddress: string, ownerAddress: string, notifyBoth: string) {
    if (EmailService.instance === undefined) {
      EmailService.instance = new EmailService(apiKey, fromAddress, fromName, adminAddress, ownerAddress, notifyBoth);
    }  
  }

  constructor(apiKey: string, fromAddress: string, fromName: string, adminAddress: string, ownerAddress: string, notifyBoth: string) {
    this.headers = new Headers();
    this.headers.append('api-key', `${apiKey}`);
    this.headers.append('Content-Type', 'application/json');
    this.fromAddress = fromAddress;
    this.fromName = fromName;
    this.adminAddress = adminAddress;
    this.ownerAddress = ownerAddress;

    if (notifyBoth === "false") {
      this.notifyBoth = false;
    } else {
      this.notifyBoth = true;
    }
  }

  public async sendContactEmail(fillerAddress: string, fillerName: string, message: string) {
    if (!EmailService.instance) {
      throw new Error("EmailService is not initialized. Call EmailService.startService() first.");
    }

    const toAddresses = this.notifyBoth ? [this.adminAddress, this.ownerAddress] : [this.adminAddress];

    for (const toAddress of toAddresses) {
      const body = this.getContactBody(toAddress, fillerAddress, fillerName, message);
      const response = await this.sendEmail(body);
      if (!response.ok) {
        throw new Error(`Failed to send email to ${toAddress}: ${response.status} ${response.statusText}`);
      }
    }

    return { success: true, message: "Contact email(s) sent successfully." };
  }

  public async sendErrorAlertEmail(
    status: number,
    timeStamp: Date,
    error: Error,
    request: Request,
  ) {
    if (!EmailService.instance) {
      throw new Error("EmailService is not initialized. Call EmailService.startService() first.");
    }

    const body = this.getErrorAlertBody(
      status,
      timeStamp.toISOString(),
      error.message,
      request.url,
      request.headers.get("User-Agent") || "",
      error.stack
    );
    const response = await this.sendEmail(body);
    if (!response.ok) {
      throw new Error(`Failed to send error alert email: ${response.status} ${response.statusText}`);
    }

    return { success: true, message: "Error alert email sent successfully." };
  }

  public async sendEmail(body: any) {
    const options = {
      method: 'POST',
      headers: this.headers,
      body,
    }

    return await fetch(this.URL, options);
  }

  private getContactBody(toAddress: string, fillerEmail: string, fillerName: string, message: string): string {
    const body = {
      sender: {
        name: this.fromName,
        email: this.fromAddress,
      },
      to: [
        {
          email: toAddress,
        },
      ],
      subject: "New Contact Form Submission",
      htmlContent: contactSubmissionTemplate(fillerEmail, fillerName, message),
    };
    return JSON.stringify(body);
  }

  private getErrorAlertBody(
    status: number,
    timeStamp: string,
    message: string,
    url: string,
    agent: string,
    stack?: string
  ): string {
    const body = {
      sender: {
        name: this.fromName,
        email: this.fromAddress,
      },
      to: [
        {
          email: this.adminAddress,
        },
      ],
      subject: `Error Alert - ${status} at ${timeStamp}`,
      htmlContent: errorReportTemplate(
        status,
        timeStamp,
        message,
        url,
        agent,
        stack
      )
    };
    return JSON.stringify(body);
  }
}