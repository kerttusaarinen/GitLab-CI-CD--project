FROM node:22

WORKDIR /app

COPY package.json .
COPY app.js .
COPY log.txt .
COPY node_modules ./node_modules

EXPOSE 3000

CMD ["node", "app.js"]