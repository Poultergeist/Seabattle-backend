FROM node:24-alpine

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

ARG PORT

RUN echo ${PORT}

COPY package.json pnpm-lock.yaml ./
COPY dist ./dist

RUN pnpm install --prod --frozen-lockfile

EXPOSE ${PORT}

CMD ["node", "dist/main"]