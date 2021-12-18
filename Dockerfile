FROM node:latest

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx browserslist@latest --update-db

COPY . .

RUN npm run build

CMD [ "http-server", "dist" ]