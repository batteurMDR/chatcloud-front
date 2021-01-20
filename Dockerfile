FROM node:14 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:1.15.8-alpine
RUN rm -rf /usr/share/nginx/html/*
COPY  docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/chatcloud-front/ /usr/share/nginx/html/
EXPOSE 80