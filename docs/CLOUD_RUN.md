# GCP Cloud Run Deployment Notes

This project is ready to deploy as a containerized API to Google Cloud Run.

## Build and deploy

Replace `YOUR_PROJECT_ID` and `YOUR_REGION` before running.

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/voice-platform-api

gcloud run deploy voice-platform-api \
  --image gcr.io/YOUR_PROJECT_ID/voice-platform-api \
  --region YOUR_REGION \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production,PORT=8080,CORS_ORIGIN=https://app.example.com \
  --set-secrets DATABASE_URL=voice-platform-db-url:latest,JWT_SECRET=voice-platform-jwt-secret:latest
```

## Production notes

- Store `DATABASE_URL` and `JWT_SECRET` in Secret Manager.
- Use Cloud SQL for PostgreSQL or a managed PostgreSQL provider.
- Add structured logging and request tracing.
- Restrict CORS to the production frontend domain.
- Add rate limiting before exposing public API endpoints.
- Add real payment provider webhooks before taking payments.

## AWS/Azure equivalents

AWS options:

- ECS Fargate for container hosting
- RDS PostgreSQL for database
- Secrets Manager for secrets
- CloudWatch for logs and metrics

Azure options:

- Azure Container Apps or AKS for container hosting
- Azure Database for PostgreSQL
- Azure Key Vault for secrets
- Azure Monitor for logs and metrics
