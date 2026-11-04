# 0003. Conditional Anti-Fabrication JSON-LD Schema Graph

**Context**: Modern LLM search agents (ChatGPT Search, Perplexity, Claude) and search engine crawlers synthesize agency identity and authority from structured linked data, but hallucinated schema properties or fabricated claims degrade domain authority and trigger search penalties.

**Decision**: We engineered a deterministic, conditional JSON-LD schema builder (`schemaGraph.ts`) that verifies canonical URL normalization, validates ISO 8601 timestamps, validates organizational relationships, and strictly prevents the output of fabricated aggregate ratings, non-existent customer review objects, or fake corporate locations.

**Consequences**: The schema graph generation requires strict runtime validation and unit test assertions against hardcoded fixtures; however, it guarantees 100% truthful, verifiable knowledge graph ingestion across all major search engines and AI citation indexes.
