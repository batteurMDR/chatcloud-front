FROM node:14 as build-step
ENV  NODE_ENV=production
WORKDIR /app
COPY ../ ./
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alpine
ADD  nginx.conf /etc/nginx/nginx.conf
COPY --from=build-step /app/dist /usr/share/nginx/html