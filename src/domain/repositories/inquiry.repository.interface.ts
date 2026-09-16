import { Inquiry } from '../entities/inquiry.entity';
import { Email } from '../value-objects/email.vo';

export interface IInquiryRepository {
  save(inquiry: Inquiry): Promise<void>;
  findById(id: string): Promise<Inquiry | null>;
  findByEmail(email: Email): Promise<Inquiry[]>;
  findAll(limit?: number, offset?: number): Promise<Inquiry[]>;
  count(): Promise<number>;
  delete(id: string): Promise<boolean>;
}
