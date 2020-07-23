FROM node:14.5.0

WORKDIR /usr/src/app

COPY ./bot_app/package*.json ./

RUN npm install

COPY ./bot_app ./
COPY .env .

ENV NODE_ENV production

CMD ["npm", "start"]