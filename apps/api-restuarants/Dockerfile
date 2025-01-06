# Use the official Node.js 18 image as the base image
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image for production
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/

# Install only production dependencies
RUN npm install --production

# Expose the default port for the NestJS app
EXPOSE 3002

# Start the application
CMD ["node", "dist/main"]
