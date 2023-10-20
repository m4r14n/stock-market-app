FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./data/stockData.json /usr/src/app/data/stockData.json

EXPOSE 5000

CMD ["node", "index.js"]