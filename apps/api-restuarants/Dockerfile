# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy only the compiled files and necessary assets
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expose the application port (adjust if needed)
EXPOSE 3002

# Start the NestJS app
CMD ["npm", "run", "start:dev"]
