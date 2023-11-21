FROM node:latest
EXPOSE 3000

WORKDIR /task1
COPY package*.json ./
COPY public/ /task1/public
COPY src/ /task1/src

RUN npm install 

CMD ["npm", "start"]
