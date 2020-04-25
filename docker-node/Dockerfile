# Specify a base image
# alpine means get most stripped down version
FROM node:alpine

# Any following command will be executed relative to this path in the container
WORKDIR /usr/app

# Install some dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./


# Default command
CMD ["npm", "start"]