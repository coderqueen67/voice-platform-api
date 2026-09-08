# Voice Platform API

A production-style backend API project for a voice AI SaaS platform. The project demonstrates TypeScript/Node backend development, auth, subscriptions, mock payments, text-to-speech job handling, consumption tracking, analytics, Docker, Kubernetes deployment files, and cloud deployment planning.

This is designed as a portfolio project for backend, platform, and API engineering roles.

## What it demonstrates

- TypeScript and Node.js backend development
- REST API design with Express
- PostgreSQL data modeling with Prisma
- JWT authentication and protected routes
- Subscription plan logic and usage limits
- Mock payment API flow
- Text-to-speech job API with character consumption tracking
- Platform analytics endpoint
- Docker containerization
- Kubernetes deployment manifests with health checks and autoscaling structure
- GCP Cloud Run deployment notes
- AWS and Azure deployment equivalents
- GitHub Actions CI workflow
- API documentation and Postman collection

## Main API areas

| Area | Purpose |
|---|---|
| Auth | Register, login, JWT-protected routes |
| Subscriptions | Free, Pro, and Enterprise plan management |
| Payments | Mock Stripe-style checkout and payment history |
| TTS Jobs | Submit text, create mock audio jobs, track usage |
| Usage | Monthly character and API request tracking |
| Analytics | Admin view of users, payments, plans, and usage |

## Tech stack

- TypeScript
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- JWT
- Docker
- Kubernetes
- GCP Cloud Run deployment notes
- GitHub Actions
- Vitest and Supertest

## Quick start

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

```bash
cp .env.example .env
```

### 3. Start PostgreSQL with Docker

```bash
docker compose up -d postgres
```

### 4. Generate Prisma client and run migrations

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Seed demo users

```bash
npm run seed
```

Demo login:

```txt
Email: demo@example.com
Password: DemoPass123!
```

### 6. Run the API

```bash
npm run dev
```

API health check:

```bash
curl http://localhost:8080/health
```

## Run with Docker

```bash
cp .env.example .env
docker compose up --build
```

## Test

```bash
npm test
```

## Build

```bash
npm run build
```

## Example API flow

Register a user:

```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@example.com","password":"DemoPass123!","name":"Demo User"}'
```

Create a TTS job:

```bash
curl -X POST http://localhost:8080/api/tts/jobs \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text":"Voice AI platforms need usage tracking, auth, plans, and reliable APIs.","voice":"clear_us_female"}'
```

Check usage:

```bash
curl http://localhost:8080/api/usage/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Kubernetes

Kubernetes manifests are in the `k8s/` folder:

- `deployment.yaml`
- `service.yaml`
- `configmap.yaml`
- `secret.example.yaml`
- `hpa.yaml`

These files show a high-availability-ready deployment structure with 3 replicas, health probes, resource requests, and autoscaling configuration.

## Cloud deployment

See `docs/CLOUD_RUN.md` for GCP Cloud Run deployment notes and AWS/Azure equivalents.

## Recruiter-friendly summary

Built a backend voice AI platform API using TypeScript, Node.js, PostgreSQL, Prisma, JWT auth, Docker, Kubernetes manifests, and GCP Cloud Run deployment notes. The API includes authentication, subscriptions, payment-status simulation, TTS job creation, consumption tracking, usage limits, analytics, tests, CI workflow, and documentation.

## Resume bullet ideas

- Built a TypeScript/Node backend API for a voice AI SaaS platform with authentication, subscription plans, mock payments, TTS job handling, usage limits, and analytics.
- Modeled PostgreSQL data with Prisma for users, subscriptions, payments, TTS jobs, and usage events.
- Containerized the API with Docker and added Kubernetes manifests with health checks, replica configuration, resource limits, and autoscaling structure.
- Added GitHub Actions CI, API tests, Postman documentation, and GCP Cloud Run deployment notes with AWS/Azure equivalents.

## Notes

This project uses mock payment and mock TTS behavior for portfolio purposes. It does not process real payments or generate real audio files.
