#builder
FROM node:20 AS  builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build



#prod

FROM node:20-alpine AS production

RUN apk add --no-cache openssl


WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

RUN npm install --omit=dev && npx prisma generate

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]