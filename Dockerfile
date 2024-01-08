
FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN rm -r package-lock.json

RUN npm run build

CMD [ "npm","start" ]

