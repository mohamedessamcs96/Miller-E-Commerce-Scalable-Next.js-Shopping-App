FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

COPY .env .env

# Prisma/Next.js ENV setup
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
ENV IS_DOCKER_BUILD=true

EXPOSE 3000

# Build and start during container run time (when DB is up)
CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run build && npm run start"]
