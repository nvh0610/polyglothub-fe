FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
ARG HOST_API
ENV REACT_APP_HOST_API=$HOST_API

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]