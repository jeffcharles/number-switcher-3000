FROM node:4.0.0-slim
MAINTAINER Jeffrey Charles <jeffreycharles@beyondtechnicallycorrect.com>

COPY . /usr/src/node
WORKDIR /usr/src/node
RUN npm install && npm run build && npm prune --production

EXPOSE 3000
CMD ["npm", "start", "--production"]
