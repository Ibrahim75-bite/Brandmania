# System Boundaries & Contracts

## 1. Request Lifecycle Boundary

```
HTTP Request
     |
     v
Request Context Middleware (Assigns Correlation ID: x-request-id)
     |
     v
Security & Rate Limiting Guard (RateLimiter Port -> 429 if exceeded)
     |
     v
Input Validation Guard (Zod Schema Validation -> 400 if invalid)
     |
     v
Route Handler (src/app/api/...)
     |
     v
Use Case Interactor (src/application/use-cases/...)
     |
     v
Domain Entity & Business Rules (src/domain/...)
     |
     v
Port Interface (e.g., IInquiryRepository, IEmailSender)
     |
     v
Infrastructure Adapter (e.g., InMemoryInquiryRepository)
     |
     v
Standardized API Response Mapper (success: true/false, meta: { requestId, timestamp })
```

## 2. Standardized Response Envelope

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "inq_01H...",
    "status": "received"
  },
  "meta": {
    "requestId": "req_01H...",
    "timestamp": "2026-09-06T17:00:00.000Z"
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": [
      {
        "field": "email",
        "issue": "Must be a valid corporate email"
      }
    ]
  },
  "meta": {
    "requestId": "req_01H...",
    "timestamp": "2026-09-06T17:00:00.000Z"
  }
}
```
