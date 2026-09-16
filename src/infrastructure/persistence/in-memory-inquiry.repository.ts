import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { Inquiry } from '../../domain/entities/inquiry.entity';
import { Email } from '../../domain/value-objects/email.vo';

export class InMemoryInquiryRepository implements IInquiryRepository {
  private readonly items = new Map<string, Inquiry>();

  public async save(inquiry: Inquiry): Promise<void> {
    this.items.set(inquiry.id, inquiry);
  }

  public async findById(id: string): Promise<Inquiry | null> {
    return this.items.get(id) ?? null;
  }

  public async findByEmail(email: Email): Promise<Inquiry[]> {
    const results: Inquiry[] = [];
    for (const inquiry of this.items.values()) {
      if (inquiry.email.equals(email)) {
        results.push(inquiry);
      }
    }
    return results;
  }

  public async findAll(limit = 50, offset = 0): Promise<Inquiry[]> {
    const all = Array.from(this.items.values());
    return all.slice(offset, offset + limit);
  }

  public async count(): Promise<number> {
    return this.items.size;
  }

  public async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  public clear(): void {
    this.items.clear();
  }
}
