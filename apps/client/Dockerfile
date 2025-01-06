# Use the official Node.js 18 image as the base image
FROM node:20-alpine AS builder

# Setting the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Use a lightweight image to serve the application
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/package*.json /app/

# Install only production dependencies
RUN npm install --production

# Expose the default Next.js port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
