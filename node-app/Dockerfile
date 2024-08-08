# FROM node:20-bullseye
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build
# ENV TZ America/Guayaquil
# EXPOSE 6505
# CMD ["npm", "start"]

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/nginx.conf
COPY ../certs /etc/nginx/certs
COPY build /etc/nginx/html

EXPOSE 80
EXPOSE 443