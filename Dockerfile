FROM node:20-alpine

WORKDIR /app

COPY . .
RUN npm i -g pnpm
RUN npm i -g @nestjs/cli
RUN pnpm install

ENTRYPOINT [ "pnpm", "start:dev" ]


