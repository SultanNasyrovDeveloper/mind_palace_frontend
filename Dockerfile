FROM node:latest

RUN npm install -g http-server

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY /frontend .

RUN npx browserslist@latest --update-db
RUN npm run build

EXPOSE 8000

CMD [ "http-server", "dist" ]