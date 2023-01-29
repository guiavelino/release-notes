FROM node:lts-alpine
WORKDIR /usr/src/app
COPY ./package.json .
COPY ./package-lock.json .
COPY . .
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
EXPOSE 3000
CMD ["yarn", "dev"]