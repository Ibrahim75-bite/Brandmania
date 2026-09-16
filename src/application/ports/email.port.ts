export interface EmailMessage {
  to: string;
  subject: string;
  bodyText: string;
  bodyHtml?: string;
}

export interface IEmailSender {
  send(message: EmailMessage): Promise<{ success: boolean; messageId: string }>;
}
