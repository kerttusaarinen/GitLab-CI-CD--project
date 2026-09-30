FROM node:22.20.0-alpine3.22

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install -g npm@latest
RUN npm ci --omit=dev

COPY app.js .
COPY log.txt .

EXPOSE 3000

CMD ["node", "app.js"]