FROM node:14.5.0

WORKDIR /usr/src/app

COPY ./bot_app/package*.json ./

RUN npm install

COPY ./bot_app ./
COPY .env .

EXPOSE 3001

CMD ["npm", "start"]