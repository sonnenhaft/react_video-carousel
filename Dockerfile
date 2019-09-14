FROM node:10

WORKDIR /usr/src/app

# in real should be uncommented
#COPY package*.json ./
RUN npm install
# in real we should not use same dir as sources in here so next should be uncommented
#COPY . .
EXPOSE 3002
CMD [ "npm", "run", "server:nodemon" ]