FROM node:16
WORKDIR /usr/src/app

COPY package*.json ./
# COPY . .
WORKDIR /usr/src/app/react_front/
RUN yarn add axios  
RUN yarn add bulma 
RUN yarn add leaflet 
RUN yarn add @mui/material @emotion/react @emotion/styled
RUN yarn add react-router-dom@6


# RUN yarn add webpack 