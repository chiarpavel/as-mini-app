FROM node:12.16.2-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_GOOGLE_CLIENT_ID

ARG REACT_APP_GOOGLE_API_KEY

EXPOSE 3010

CMD [ "npm", "start" ]
