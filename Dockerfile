FROM node:lts-alpine

#install simple http server

RUN npm install -g http-server

# Set the working directory
WORKDIR /app

EXPOSE 5002
CMD ["http-server", "dev.heanlab/dist", "-p", "5002"]