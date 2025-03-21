FROM node:20 AS base

# DEPENDENCY STAGE
FROM base AS deps
WORKDIR /app
COPY package.json yarn.lock ./
COPY prisma ./prisma/
COPY src ./src
COPY tsconfig*.json ./
RUN yarn install --frozen-lockfile --production=false

# BUILD STAGE
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn compile

# PRODUCTION STAGE
FROM base AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json yarn.lock ./
COPY prisma ./prisma/
RUN yarn install --frozen-lockfile --production

EXPOSE 8000

CMD [ "node", "dist/src/server" ]

