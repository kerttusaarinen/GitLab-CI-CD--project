FROM node:22-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev

COPY app.js .
COPY log.txt .

EXPOSE 3000

CMD ["node", "app.js"]