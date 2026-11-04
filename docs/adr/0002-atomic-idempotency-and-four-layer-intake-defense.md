# 0002. Atomic Idempotency and Four-Layer Intake Defense

**Context**: High-ticket intake submissions are targets for automated spam, duplicate clicks by corporate executives, and potential scraping, while legitimate executive submissions must never be dropped or silently corrupted.

**Decision**: We established a mandatory four-layer defense pipeline at the intake seam comprising: (1) client-IP token-bucket rate limiting (60 req/60s), (2) invisible honeypot trap field (`company_fax_number`), (3) client-side submission duration time-lock (minimum 2500ms), and (4) atomic header-driven idempotency caching (`Idempotency-Key` persisted with 24-hour TTL) with asynchronous non-blocking email notifications.

**Consequences**: Automated API testing and CLI callers must provide valid simulation timings or explicitly bypass security gates; in exchange, the intake infrastructure guarantees zero spam ingestion, zero duplicate record generation, and sub-100ms response times for legitimate executive inquiries.
