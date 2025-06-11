# Use official Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app files
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port (3000)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
