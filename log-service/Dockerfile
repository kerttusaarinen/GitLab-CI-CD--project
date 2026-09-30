FROM node:22.23.3-alpine3.24

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json .

RUN npm --version
RUN npm ls -g --depth=0
RUN npm install --omit=dev

COPY app.js .
COPY log.txt .

EXPOSE 3000

CMD ["node", "app.js"]