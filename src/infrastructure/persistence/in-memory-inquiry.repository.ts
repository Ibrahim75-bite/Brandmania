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

  public async findByIds(ids: string[]): Promise<Inquiry[]> {
    const results: Inquiry[] = [];
    for (const id of ids) {
      const item = this.items.get(id);
      if (item) {
        results.push(item);
      }
    }
    return results;
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
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const safeOffset = Math.max(0, offset);
    const all = Array.from(this.items.values());
    return all.slice(safeOffset, safeOffset + safeLimit);
  }

  public async count(): Promise<number> {
    return this.items.size;
  }

  public async delete(id: string): Promise<boolean> {
    return this.items.delete(id);
  }

  public async purgeExpired(retentionDays = 90): Promise<number> {
    const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    let purgedCount = 0;

    for (const [id, inquiry] of this.items.entries()) {
      const statusStr = inquiry.status as string;
      const isUnqualifiedOrRejected =
        statusStr === 'REJECTED' || statusStr === 'UNQUALIFIED';
      const isOlderThanCutoff = inquiry.createdAt.getTime() < cutoffMs;

      if (isUnqualifiedOrRejected && isOlderThanCutoff) {
        this.items.delete(id);
        purgedCount++;
      }
    }

    return purgedCount;
  }

  public clear(): void {
    this.items.clear();
  }
}
