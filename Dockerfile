FROM node:16-alpine As builder
WORKDIR /app
COPY package*.json ./
RUN npm i --force
COPY . .
RUN npm run build

FROM node:16-alpine As production
WORKDIR /app
COPY package*.json ./
RUN npm i --force --omit=dev && npm i --force -g pm2
COPY --from=builder /app/dist ./dist
COPY ./ecosystem.config.js  .
CMD ["pm2-runtime","start","ecosystem.config.js"]
