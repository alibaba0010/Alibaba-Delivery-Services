# Install dependencies only when needed
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Production image, copy all the files needed to run the app
FROM node:18-alpine AS runner
WORKDIR /app

# Set environment variable to production
ENV NODE_ENV production

# Copy built assets and node modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# Expose port 3000 (default for NextJS)
EXPOSE 4200

# Start the NextJS server
CMD ["npm", "run", "dev"]
