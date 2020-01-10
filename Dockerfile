FROM node:8.11.1

# Create app directory
RUN mkdir -p /usr/src/recognition-app-api
WORKDIR /usr/src/recognition-app-api

# Install app dependencies
COPY package.json /usr/src/recognition-app-api
RUN yarn

# Bundle app source
COPY . /usr/src/recognition-app-api

# Build arguments
ARG NODE_VERSION=8.11.1

# Environment
ENV NODE_VERSION $NODE_VERSION