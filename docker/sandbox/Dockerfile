ARG NODE_VERSION
FROM node:$NODE_VERSION-alpine AS builder

# Create app directory
WORKDIR /app

#RUN apk add --update --no-cache openssl1.1-compat

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json tsconfig.json yarn.lock prisma dist . ./

# Install app dependencies
RUN yarn && yarn postinstall

FROM node:$NODE_VERSION-alpine AS prod

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 7000
CMD [ "yarn", "start:prod" ]