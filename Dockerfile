# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production
ARG HOST_API
ENV REACT_APP_HOST_API=$HOST_API

COPY . .

RUN npm run build

# Stage 2: Production
FROM node:18-alpine

WORKDIR /app

# Copy chỉ những gì cần thiết cho production
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

EXPOSE 3000

# Sử dụng một server để phục vụ các file tĩnh
RUN npm install -g serve

CMD ["serve", "-s", "build"]