FROM node:lts-alpine

WORKDIR /code
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 3000
CMD ["node", "./dist/main.js"]