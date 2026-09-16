import { DomainValidationError } from '../errors/domain.error';
import { Email } from '../value-objects/email.vo';
import { CompanyTier } from '../value-objects/company-tier.vo';
import { BudgetRange } from '../value-objects/budget-range.vo';
import { ServiceCategory } from '../value-objects/service-category.vo';

export type InquiryStatus = 'PENDING' | 'QUALIFIED' | 'CONTACTED' | 'REJECTED';

export interface InquiryProps {
  id: string;
  clientName: string;
  companyName: string;
  email: Email;
  companyTier: CompanyTier;
  budgetRange: BudgetRange;
  services: ServiceCategory[];
  message: string;
  status: InquiryStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class Inquiry {
  private readonly _id: string;
  private readonly _clientName: string;
  private readonly _companyName: string;
  private readonly _email: Email;
  private readonly _companyTier: CompanyTier;
  private readonly _budgetRange: BudgetRange;
  private readonly _services: ServiceCategory[];
  private readonly _message: string;
  private _status: InquiryStatus;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  private constructor(props: InquiryProps) {
    this._id = props.id;
    this._clientName = props.clientName;
    this._companyName = props.companyName;
    this._email = props.email;
    this._companyTier = props.companyTier;
    this._budgetRange = props.budgetRange;
    this._services = props.services;
    this._message = props.message;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static create(params: {
    id: string;
    clientName: string;
    companyName: string;
    email: Email;
    companyTier: CompanyTier;
    budgetRange: BudgetRange;
    services: ServiceCategory[];
    message: string;
  }): Inquiry {
    if (!params.id || params.id.trim().length === 0) {
      throw new DomainValidationError('Inquiry ID is required', 'id');
    }
    if (!params.clientName || params.clientName.trim().length < 2) {
      throw new DomainValidationError('Client name must be at least 2 characters', 'clientName');
    }
    if (!params.companyName || params.companyName.trim().length < 2) {
      throw new DomainValidationError('Company name must be at least 2 characters', 'companyName');
    }
    if (!params.services || params.services.length === 0) {
      throw new DomainValidationError('At least one service must be selected', 'services');
    }
    if (!params.message || params.message.trim().length < 10) {
      throw new DomainValidationError('Message must be at least 10 characters long', 'message');
    }

    const now = new Date();
    return new Inquiry({
      id: params.id,
      clientName: params.clientName.trim(),
      companyName: params.companyName.trim(),
      email: params.email,
      companyTier: params.companyTier,
      budgetRange: params.budgetRange,
      services: params.services,
      message: params.message.trim(),
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    });
  }

  public static reconstruct(props: InquiryProps): Inquiry {
    return new Inquiry(props);
  }

  public qualify(): void {
    if (this._status === 'REJECTED') {
      throw new DomainValidationError('Cannot qualify an inquiry that has been marked as rejected');
    }
    this._status = 'QUALIFIED';
    this._updatedAt = new Date();
  }

  public markContacted(): void {
    this._status = 'CONTACTED';
    this._updatedAt = new Date();
  }

  public reject(): void {
    this._status = 'REJECTED';
    this._updatedAt = new Date();
  }

  // Getters
  public get id(): string { return this._id; }
  public get clientName(): string { return this._clientName; }
  public get companyName(): string { return this._companyName; }
  public get email(): Email { return this._email; }
  public get companyTier(): CompanyTier { return this._companyTier; }
  public get budgetRange(): BudgetRange { return this._budgetRange; }
  public get services(): ReadonlyArray<ServiceCategory> { return Object.freeze([...this._services]); }
  public get message(): string { return this._message; }
  public get status(): InquiryStatus { return this._status; }
  public get createdAt(): Date { return this._createdAt; }
  public get updatedAt(): Date { return this._updatedAt; }
}
