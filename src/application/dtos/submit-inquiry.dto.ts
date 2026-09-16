export interface SubmitInquiryInputDto {
  clientName: string;
  companyName: string;
  email: string;
  companyTier: string;
  budgetRange: string;
  services: string[];
  message: string;
}

export interface SubmitInquiryOutputDto {
  inquiryId: string;
  status: string;
  estimatedReviewHours: number;
  priorityScore: number;
  receivedAt: string;
}
