# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application (creates .medusa/server)
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/.medusa ./.medusa

# Copy configuration files
COPY medusa-config.ts ./
COPY tsconfig.json ./

# Copy source files (needed for runtime)
COPY src ./src

# Expose the port
EXPOSE 9000

# Set default PORT if not provided
ENV PORT=9000

# Run migrations and start the application
CMD ["sh", "-c", "npm run predeploy && npm start"]