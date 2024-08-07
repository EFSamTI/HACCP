FROM node:20-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV TZ America/Guayaquil
EXPOSE 6505
CMD ["npm", "start"]