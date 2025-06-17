FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install -g wait-port && npm install

# Copy app source code and env file
COPY . .
COPY .env .env

# Setup environment variables at build time (can be overridden at runtime)
ARG DATABASE_URL
ARG NEXTAUTH_SECRET

ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV IS_DOCKER_BUILD=true

# Expose port
EXPOSE 3000

# Wait for PostgreSQL container (`db`) to be ready, then run migrations and start the app
CMD ["sh", "-c", "wait-port db:5432 && npx prisma migrate dev --name init --skip-seed && npm run build && npm run start"]
