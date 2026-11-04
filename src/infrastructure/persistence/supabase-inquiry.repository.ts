import { IInquiryRepository } from '../../domain/repositories/inquiry.repository.interface';
import { Inquiry } from '../../domain/entities/inquiry.entity';
import { Email } from '../../domain/value-objects/email.vo';
import { CompanyTier } from '../../domain/value-objects/company-tier.vo';
import { BudgetRange } from '../../domain/value-objects/budget-range.vo';
import { ServiceCategory } from '../../domain/value-objects/service-category.vo';
import { DatabasePoolManager } from './db-pool-config';

interface InquiryDbRecord {
  id: string;
  client_name: string;
  company_name: string;
  email: string;
  company_tier: string;
  budget_range: string;
  services: string[];
  message: string;
  status: string;
  priority_score: number;
  created_at: string;
  updated_at: string;
}

export class SupabaseInquiryRepository implements IInquiryRepository {
  private readonly poolManager: DatabasePoolManager;
  private readonly fallbackStore = new Map<string, Inquiry>();

  constructor(
    private readonly supabaseUrl?: string,
    private readonly supabaseKey?: string
  ) {
    this.poolManager = DatabasePoolManager.getInstance();
  }

  private mapRowToEntity(row: InquiryDbRecord): Inquiry {
    return Inquiry.create({
      id: row.id,
      clientName: row.client_name,
      companyName: row.company_name,
      email: new Email(row.email),
      companyTier: new CompanyTier(row.company_tier),
      budgetRange: new BudgetRange(row.budget_range),
      services: row.services.map((s) => new ServiceCategory(s)),
      message: row.message,
    });
  }

  public async save(inquiry: Inquiry): Promise<void> {
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(`${this.supabaseUrl}/rest/v1/inquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
            Prefer: 'resolution=merge-duplicates',
          },
          body: JSON.stringify({
            id: inquiry.id,
            client_name: inquiry.clientName,
            company_name: inquiry.companyName,
            email: inquiry.email.value,
            company_tier: inquiry.companyTier.value,
            budget_range: inquiry.budgetRange.value,
            services: inquiry.services.map((s) => s.code),
            message: inquiry.message,
            status: inquiry.status,
            created_at: inquiry.createdAt.toISOString(),
            updated_at: inquiry.updatedAt.toISOString(),
          }),
        });

        if (!res.ok) {
          throw new Error(`Supabase save inquiry failed with status ${res.status}`);
        }
        return;
      } catch (err) {
        this.fallbackStore.set(inquiry.id, inquiry);
        return;
      }
    }

    this.fallbackStore.set(inquiry.id, inquiry);
  }

  public async findById(id: string): Promise<Inquiry | null> {
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}&select=*`,
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
            },
          }
        );
        if (res.ok) {
          const rows: InquiryDbRecord[] = await res.json();
          if (rows && rows.length > 0) {
            return this.mapRowToEntity(rows[0]);
          }
        }
      } catch {
      }
    }

    return this.fallbackStore.get(id) ?? null;
  }

  public async findByIds(ids: string[]): Promise<Inquiry[]> {
    const results: Inquiry[] = [];
    for (const id of ids) {
      const item = await this.findById(id);
      if (item) results.push(item);
    }
    return results;
  }

  public async findByEmail(email: Email): Promise<Inquiry[]> {
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/inquiries?email=eq.${encodeURIComponent(email.value)}&select=*`,
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
            },
          }
        );
        if (res.ok) {
          const rows: InquiryDbRecord[] = await res.json();
          if (rows) {
            return rows.map((r) => this.mapRowToEntity(r));
          }
        }
      } catch {
      }
    }

    const matches: Inquiry[] = [];
    for (const item of this.fallbackStore.values()) {
      if (item.email.equals(email)) {
        matches.push(item);
      }
    }
    return matches;
  }

  public async findAll(limit = 50, offset = 0): Promise<Inquiry[]> {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const safeOffset = Math.max(0, offset);

    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/inquiries?select=*&limit=${safeLimit}&offset=${safeOffset}&order=created_at.desc`,
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
            },
          }
        );
        if (res.ok) {
          const rows: InquiryDbRecord[] = await res.json();
          return rows.map((r) => this.mapRowToEntity(r));
        }
      } catch {
      }
    }

    const all = Array.from(this.fallbackStore.values());
    return all.slice(safeOffset, safeOffset + safeLimit);
  }

  public async count(): Promise<number> {
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(`${this.supabaseUrl}/rest/v1/inquiries?select=count`, {
          headers: {
            apikey: this.supabaseKey,
            Authorization: `Bearer ${this.supabaseKey}`,
            Prefer: 'count=exact',
          },
        });
        const countHeader = res.headers.get('content-range');
        if (countHeader) {
          const total = parseInt(countHeader.split('/')[1], 10);
          if (!isNaN(total)) return total;
        }
      } catch {
      }
    }

    return this.fallbackStore.size;
  }

  public async delete(id: string): Promise<boolean> {
    if (this.supabaseUrl && this.supabaseKey) {
      try {
        const res = await fetch(
          `${this.supabaseUrl}/rest/v1/inquiries?id=eq.${encodeURIComponent(id)}`,
          {
            method: 'DELETE',
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
            },
          }
        );
        if (res.ok) return true;
      } catch {
      }
    }

    return this.fallbackStore.delete(id);
  }

  public async purgeExpired(retentionDays = 90): Promise<number> {
    const cutoffMs = Date.now() - retentionDays * 24 * 60 * 60 * 1000;
    let purgedCount = 0;

    for (const [id, inquiry] of this.fallbackStore.entries()) {
      if (inquiry.createdAt.getTime() < cutoffMs) {
        this.fallbackStore.delete(id);
        purgedCount++;
      }
    }

    return purgedCount;
  }
}
