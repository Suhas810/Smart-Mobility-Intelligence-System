# Build frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

# Production image
FROM node:18-alpine
WORKDIR /app

# Install backend dependencies
COPY server/package*.json ./
RUN npm ci --only=production

# Copy backend files
COPY server/ ./

# Copy built frontend to backend public folder
RUN mkdir -p ./public
COPY --from=frontend-build /app/client/dist ./public

# Create .env file with defaults
ENV PORT=8080
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "server.js"]
