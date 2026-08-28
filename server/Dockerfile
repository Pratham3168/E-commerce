FROM node:22-alpine

WORKDIR /server

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

RUN mkdir -p uploads

ENV NODE_ENV=production

EXPOSE 2068

CMD ["npm", "start"]

