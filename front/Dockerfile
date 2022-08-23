FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install axios bulma && npm install leaflet react-leaflet@next --save