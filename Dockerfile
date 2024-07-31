FROM ubuntu 

WORKDIR /easy-shop

COPY package.json ./
COPY package-lock.json ./

#RUN NPM INSTALL

#COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]


