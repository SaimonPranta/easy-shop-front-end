FROM node:21.0.0

WORKDIR /easy-shop

COPY package.json ./
COPY package-lock.json ./

RUN npm install --force

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]


