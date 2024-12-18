FROM node:lts-alpine

WORKDIR /app

COPY package.json ./
RUN npm install

COPY vite.config.js vite.config.js
COPY index.html index.html
COPY src src
COPY public public

CMD npm run dev