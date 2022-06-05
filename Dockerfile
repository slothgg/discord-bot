FROM node:17

RUN mkdir -p /app/src
WORKDIR /app
COPY ./bot ./
RUN npm install

EXPOSE 8000
CMD ["npm", "start"]