# Postman Quick Test Flow

1. Import `postman/voice-platform-api.postman_collection.json`.
2. Start the API locally.
3. Register a user.
4. Copy the returned token into the `token` collection variable.
5. Call subscription, mock checkout, TTS job, and usage endpoints.

Recommended test order:

1. `GET /health`
2. `POST /api/auth/register`
3. `GET /api/auth/me`
4. `GET /api/subscriptions/plans`
5. `POST /api/payments/checkout/mock`
6. `POST /api/tts/jobs`
7. `GET /api/usage/me`
