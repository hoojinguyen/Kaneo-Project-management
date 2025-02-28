FROM --platform=$BUILDPLATFORM oven/bun:1 AS base
WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    sqlite3 \
    && rm -rf /var/lib/apt/lists/*

COPY package.json .
COPY bun.lockb .
COPY apps/api/package.json ./apps/api/package.json
COPY packages/typescript-config/package.json ./packages/typescript-config/package.json

RUN bun install --no-frozen-lockfile

COPY packages/typescript-config ./packages/typescript-config
COPY apps/api ./apps/api

FROM oven/bun:1-alpine AS runtime
WORKDIR /app/apps/api

RUN mkdir -p /app/apps/api/data && chmod 777 /app/apps/api/data

COPY --from=base /app/apps/api ./
COPY --from=base /app/node_modules ../node_modules
COPY --from=base /app/packages ../packages

ENV NODE_ENV=production
ENV PORT=8080
ENV DB_PATH=/app/apps/api/data/kaneo.db
ENV JWT_ACCESS=hooji98
ENV RABBITMQ_URL=amqp://hooji98:hooji98@rabbitmq-render-5rc5.onrender.com

EXPOSE 8080

CMD ["bun", "run", "/app/apps/api/src/index.ts"]