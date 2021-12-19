FROM node:latest as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npx browserslist@latest --update-db

COPY . .

RUN npm run build

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]