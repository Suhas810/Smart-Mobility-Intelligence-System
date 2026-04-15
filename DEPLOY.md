# SafeRoute AI - Google Cloud Run Deployment Guide

## Prerequisites

- Google Cloud Account
- Google Cloud CLI installed (`gcloud` command)
- Docker installed (for local testing)
- Project ID: `my-new-project-2-493404`

## Deployment Steps

### 1. Set Up Google Cloud CLI

```bash
gcloud auth login
gcloud config set project my-new-project-2-493404
```

### 2. Enable Required APIs

```bash
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com
```

### 3. Deploy to Cloud Run

#### Option A: Using Cloud Build (Recommended)

```bash
cd "e:\projects\Smart Mobility Intelligence System\safe-route-ai"
gcloud builds submit --config cloudbuild.yaml
```

#### Option B: Manual Deployment

```bash
# Build and push image
cd "e:\projects\Smart Mobility Intelligence System\safe-route-ai"
docker build -t gcr.io/my-new-project-2-493404/safe-route-ai:latest .
docker push gcr.io/my-new-project-2-493404/safe-route-ai:latest

# Deploy to Cloud Run
gcloud run deploy safe-route-ai \
  --image gcr.io/my-new-project-2-493404/safe-route-ai:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

### 4. Configure Environment Variables (Optional)

If you add MongoDB later:

```bash
gcloud run services update safe-route-ai \
  --update-env-vars MONGO_URI='your-mongodb-uri' \
  --region us-central1
```

### 5. Monitor Deployment

```bash
# View logs
gcloud run logs read safe-route-ai --limit=50 --region=us-central1

# Check status
gcloud run services describe safe-route-ai --region us-central1
```

## After Deployment

Your app will be available at:
```
https://safe-route-ai-[random-id].a.run.app
```

## Troubleshooting

- **Port not exposed**: Ensure the server listens on `process.env.PORT || 8080`
- **404 errors**: Check that frontend build output is copied to `./public`
- **Memory issues**: Increase Cloud Run memory allocation in gcloud command

## Clean Up

To remove the deployment:

```bash
gcloud run services delete safe-route-ai --region us-central1
```
