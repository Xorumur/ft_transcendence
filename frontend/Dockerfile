FROM node:18-alpine

WORKDIR /test-app

COPY package.json package-lock.json ./

RUN npm i
COPY . .
RUN npm run build

CMD npm rebuild esbuild && npm run dev -- --host
