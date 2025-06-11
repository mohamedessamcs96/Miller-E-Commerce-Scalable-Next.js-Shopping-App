# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for better Docker caching)
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy rest of the application files
COPY . .

# Copy .env if available (optional step)
COPY .env .env

# Build the Next.js app
RUN npm run build

# Set environment variable (for Prisma or Next.js)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Expose port
EXPOSE 3000

# Run the app in production
CMD ["npm", "run", "start"]


ENV IS_DOCKER_BUILD=true
