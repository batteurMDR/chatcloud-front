FROM node:14 as build-step

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:1.17.1-alpine
ADD  docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist /usr/share/nginx/html