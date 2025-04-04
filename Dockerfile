FROM node:lts-alpine

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3 make g++ 
RUN apk add --no-cache git curl ca-certificates

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies

# RUN if [ -f package-lock.json ]; then npm ci ; else npm install; fi



# RUN npm install --legacy-peer-deps

# Copy the entire monorepo
COPY . .


# Expose ports for both services
EXPOSE 4200 3002

# Default command (services can be overridden in docker-compose)
# CMD ["sh", "-c", "npx nx serve api-restuarants & npx nx serve restuarant-dashboard"]
CMD ["tail", "-f", "/dev/null"]