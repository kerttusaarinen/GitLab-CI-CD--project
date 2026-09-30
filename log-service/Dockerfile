FROM node:22.20.0-alpine3.22

RUN apk update && apk upgrade

WORKDIR /app

COPY package.json .


RUN npm install --omit=dev

COPY app.js .
COPY log.txt .

RUN rm -rf /usr/local/lib/node_modules/npm

EXPOSE 3000

CMD ["node", "app.js"]