FROM node:alpine

WORKDIR /app
EXPOSE 5000

COPY . .

RUN npm install && \
    apk add --no-cache tzdata \

ENV TZ Asia/Singapore

CMD ["npm", "start"]
