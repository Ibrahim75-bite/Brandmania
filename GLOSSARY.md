# Brandmania Strategic & Architectural Glossary

Canonical domain and architectural vocabulary for the Brandmania platform.

## Commercial Practice & Engagement Models

**Brand Direction**:
Flagship Discipline I; aligning brand story, narrative, tone of voice, positioning, USP, trust architecture, visual identity, vision, and mission with ideal market perception to command pricing power.
_Avoid_: graphic design, logo design, brand guidelines

**Margin Recovery**:
Flagship Discipline II; a 6-stage commercial audit across Planning, Marketing, Sales, Fulfillment, Customer Service, and Post-Purchase Relationships to seal revenue and margin leakage before buying traffic.
_Avoid_: 8-vector audit, CRO, media buying

**Consumer Scope**:
Flagship Discipline III; engineering customer perception, experience, and cognitive attachment across 7 behavioral dimensions using psychology and behavioral economics.
_Avoid_: neuromarketing (as a standalone public heading), standard analytics

**Annual Revenue Threshold**:
The verified commercial qualification baseline of $700,000+ in annual revenue for established enterprises and high-ticket international brands.
_Avoid_: ARR, Annual Recurring Revenue, MRR

**Full Strategic & Performance Engagement**:
Track I engagement model covering end-to-end transformation across all three flagship disciplines and supporting capabilities.
_Avoid_: agency retainer, monthly package

**Strategic Consultancy**:
Track II advisory model for qualifying brands seeking diagnostic clarity prior to a full rebuild or when full-engagement capacity is reached.
_Avoid_: coaching, hourly consulting

**Strategic Qualification Inquiry**:
The 3-step executive intake submission (`Inquiry` aggregate) evaluated for mutual commercial fit under non-disclosure.
_Avoid_: lead form, contact us form, free audit signup

**Reference Dossier ID**:
The unique, non-guessable identifier (`inq_...`) issued upon verified submission of a Strategic Qualification Inquiry.
_Avoid_: ticket number, order ID

## Codebase Architecture & Design Vocabulary

**Module**:
Anything with an interface and an implementation (function, class, package, or vertical slice).
_Avoid_: unit, service, helper, manager

**Interface**:
Everything a caller must know to use a module correctly: type signature, invariants, ordering constraints, error modes, and performance bounds.
_Avoid_: API, signature

**Seam**:
A place where behavior can be altered or observed without editing in that place; the boundary where a module's interface lives and where callers and tests cross.
_Avoid_: boundary, layer

**Adapter**:
A concrete implementation that satisfies an interface at a seam (e.g., `InMemoryInquiryRepository`, `SupabaseInquiryRepository`).
_Avoid_: connector, plugin

**Depth**:
Leverage at the interface—how much behavior a caller or test exercises per unit of interface learned (`Deep Module = small interface + rich implementation`).
_Avoid_: complexity, size

**Leverage**:
What callers gain from depth: maximum capability per unit of interface learned.
_Avoid_: utility, reuse

**Locality**:
What maintainers gain from depth: bugs, invariants, and changes stay inside one module rather than leaking across callers.
_Avoid_: cohesion, encapsulation
