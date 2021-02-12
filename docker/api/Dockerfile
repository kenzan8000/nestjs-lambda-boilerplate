FROM node:12.18.0-buster

RUN apt-get update -qq && \
    apt-get install -y build-essential && \
    apt-get install -y vim

RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN yarn

ENV HOST 0.0.0.0
EXPOSE 3000