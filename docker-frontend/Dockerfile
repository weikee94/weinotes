FROM node:alpine as builder
WORKDIR '/app'
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
# https://hub.docker.com/_/nginx
# we copy build folder to nginx default path to serve static content
COPY --from=builder /app/build /usr/share/nginx/html