FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

FROM gcr.io/distroless/nodejs20-debian12 AS production

ENV NODE_ENV=production
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/app.js ./

EXPOSE 3000

CMD [ "node", "app.js" ]
