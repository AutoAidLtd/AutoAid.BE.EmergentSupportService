FROM node:20-alpine

WORKDIR /app

COPY . .
RUN npm i -g pnpm
RUN npm i -g @nestjs/cli
RUN npm i -g typescript
RUN pnpm install

EXPOSE 4000

ENTRYPOINT [ "pnpm", "start:dev" ]


