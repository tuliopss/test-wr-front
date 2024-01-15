## Dockerfile

FROM node:16-alpine

WORKDIR /home/testtec/front 

COPY package*.json .
RUN npm install


EXPOSE 5173
