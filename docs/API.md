# API Overview

Base URL for local development:

```txt
http://localhost:8080
```

## Health

```http
GET /health
```

## Auth

```http
POST /api/auth/register
POST /api/auth/login
GET /api/auth/me
```

Protected routes require:

```http
Authorization: Bearer <token>
```

## Subscriptions

```http
GET /api/subscriptions/plans
GET /api/subscriptions/current
PATCH /api/subscriptions/current
```

## Payments

```http
POST /api/payments/checkout/mock
GET /api/payments/history
```

The payment API simulates Stripe-style checkout behavior without collecting real payment information.

## Text to Speech

```http
POST /api/tts/jobs
GET /api/tts/jobs
```

The TTS route returns a mock audio URL and records character usage. It demonstrates backend architecture for usage-limited AI/voice products.

## Usage Tracking

```http
GET /api/usage/me
```

Returns monthly character usage, API request usage, plan limits, and current plan.

## Analytics

```http
GET /api/analytics/platform
```

Requires an admin token. Returns user count, TTS jobs, payments by status, subscriptions by plan, and tracked usage quantity.
