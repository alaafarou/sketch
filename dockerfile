FROM node:22.21.0 as base
WORKDIR /app
COPY package*.json ./


FROM base as dev
    RUN npm install
    COPY . .
    CMD ["npm", "run", "start:dev"]


FROM base AS builder
    RUN npm ci
    COPY . .
    RUN npm run build

    
FROM base AS prod
    RUN npm ci --omit=dev
    COPY --from=builder /app/dist ./dist
    CMD ["npm", "run", "start:prod"]









