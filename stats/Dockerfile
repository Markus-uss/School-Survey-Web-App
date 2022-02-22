FROM node:16

WORKDIR /stats

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8100

CMD ["node", "app.js"]