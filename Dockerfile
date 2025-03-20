FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
COPY apps/restuarant-dashboard/package.json ./apps/restuarant-dashboard/
# RUN if [ -f package-lock.json ]; then npm ci ; else npm install; fi
RUN npm install



# RUN npm install --legacy-peer-deps

# Copy the entire monorepo
COPY . .


# Expose ports for both services
EXPOSE 4200 3002

# Default command (services can be overridden in docker-compose)
# CMD ["sh", "-c", "npx nx serve api-restuarants & npx nx serve restuarant-dashboard"]
CMD ["tail", "-f", "/dev/null"]
