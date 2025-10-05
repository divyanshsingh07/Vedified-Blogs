# Stage 1: Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install --production

# Stage 2: Build final image
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Copy node_modules from previous stage
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Expose backend port
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]