FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY build ./build
COPY package.json .

RUN npm install --production --loglevel warn

EXPOSE 7000


ENTRYPOINT ["node", "build/server.js"]
