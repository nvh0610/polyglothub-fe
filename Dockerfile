# Stage 1: Build React App
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG HOST_API
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built React app từ builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Expose cổng HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]